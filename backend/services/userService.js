const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OwnersRentalRequest = require("../models/ownerRentalRequests");
const AppError = require("../utils/AppError");
const { where } = require("sequelize");

const createUser = async (userData, files) => {
  try {
    // Destructure userData fields
    const {
      username,
      first_name,
      last_name,
      national_number,
      date_of_birth,
      password,
      nationality,
      email,
      phone_number,
    } = userData;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Default values
    const role = 1;
    const defaultRating = 5;

    // Handle profile photo
    const photoUrl = files.map((file) => file.path);

    // Create the user in the database
    const newUser = await User.create({
      username,
      first_name,
      last_name,
      national_number,
      date_of_birth,
      password: hashedPassword,
      nationality,
      rating: defaultRating,
      email,
      role_id: role,
      phone_number,
      profile_photo: photoUrl,
    });

    // Create a JWT payload
    const payload = {
      userId: newUser.user_id,
      country: newUser.nationality,
      userName: newUser.username,
      role: newUser.role_id,
      firstName: newUser.first_name,
      lastName: newUser.last_name,
      profile_photo: newUser.profile_photo,
    };

    // Generate the token
    const options = { expiresIn: "1d" };
    const secret = process.env.SECRET;
    const token = jwt.sign(payload, secret, options);

    // Return the created user and token
    return {
      user: newUser,
      token,
    };
  } catch (error) {
    throw error; // Let the controller handle errors
  }
};

const findAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users; // Return only the data
  } catch (error) {
    throw new Error(error.message); // Throw the error to the controller
  }
};

const findUserByUserId = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const loginUser = async (credentials) => {
  let { email, national_number, password } = credentials;

  // Ensure email is always lowercase
  if (email) {
    email = email.toLowerCase();
  }

  // Determine whether the input contains email or national number
  const isEmail = Boolean(email);

  // Find user by email or national number
  const user = await User.findOne({
    where: isEmail ? { email } : { national_number },
  });

  // Check if user exists
  if (!user) {
    throw new AppError("User not found", 401);
  }

  // Compare provided password with stored hashed password
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new AppError("Password or email is incorrect", 401);
  }

  // Generate JWT token
  const payload = {
    userId: user.user_id,
    country: user.nationality,
    userName: user.username,
    role: user.role_id,
    firstName: user.first_name,
    lastName: user.last_name,
    profile_photo: user.profile_photo,
  };
  const options = { expiresIn: "1d" };
  const secret = process.env.SECRET;

  const token = jwt.sign(payload, secret, options);

  // Return the token and user information
  return token;
};

const acceptOwnerRequestService = async (requestId, role) => {
  // Check if the role is authorized
  if (role !== 3) {
    throw new AppError("Unauthorized: Only admins can approve requests", 403);
  }

  // Find the rental request
  const request = await OwnersRentalRequest.findByPk(requestId);

  if (!request) {
    throw new AppError("Request not found: Failed to change the role", 404);
  }

  try {
    // Update request state to 'approved'
    await OwnersRentalRequest.update(
      { request_state: "approved" },
      { where: { request_id: requestId } }
    );

    // Update the user's role to '2' (Owner)
    await User.update({ role_id: 2 }, { where: { user_id: request.user_id } });

    // Return success response
    return {
      userId: request.user_id,
      message: `The role for user ${request.user_id} is changed and request is approved`,
    };
  } catch (error) {
    throw new AppError("Failed to approve the request", 500, {
      details: error.message,
    });
  }
};

const RequestToBecomeRenterService = async (userId) => {
  // Find user by ID
  const user = await User.findByPk(userId);

  //Already has a request
  const requestExists = await OwnersRentalRequest.findOne({
    where: { user_id: userId },
  });

  if (requestExists)
    throw new AppError("Users cant request more than once ", 403);
  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Create a new request
  const newRequest = await OwnersRentalRequest.create({ user_id: userId });

  return newRequest;
};

const getAllOwnersRequestsService = async () => {
  try {
    // Fetch all owner rental requests
    const requests = await OwnersRentalRequest.findAll();

    // Check if no requests are found
    if (!requests || requests.length === 0) {
      throw new AppError("No owner requests found", 404);
    }

    return requests;
  } catch (error) {
    throw new AppError("Unable to load requests", 500, {
      details: error.message,
    });
  }
};

const refreshToken = async (userId) => {
  // Find user by ID
  const user = await User.findByPk(userId);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  // Generate a new token
  const payload = {
    userId: user.user_id,
    country: user.nationality,
    userName: user.username,
    role: user.role_id,
    firstName: user.first_name,
    lastName: user.last_name,
  };
  const options = { expiresIn: "1d" };
  const secret = process.env.SECRET;

  const token = jwt.sign(payload, secret, options);

  return token; // Return only the token
};

const terminateUserService = async (userId) => {
  try {
    const deletedCount = await User.destroy({where : {user_id : userId}});

    if (deletedCount === 0) {
      throw new AppError("user not found or unauthorized access", 404);
    }
    
    return {
      success : true,
      message : "user is deleted successfully"
    }
  } catch (error) {
    
      throw new AppError(
        error.message || "Failed to delete user",
        error.statusCode || 500,
        error.details
      )
  }
};

module.exports = {
  createUser,
  findAllUsers,
  loginUser,
  acceptOwnerRequestService,
  RequestToBecomeRenterService,
  getAllOwnersRequestsService,
  refreshToken,
  findUserByUserId,
  terminateUserService
};
