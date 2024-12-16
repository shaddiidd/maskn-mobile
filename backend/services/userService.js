const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OwnersRentalRequest = require("../models/ownerRentalRequests");
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
      profile_photo: newUser.profile_photo, // Reference the correct field
    };

    // Generate the token
    const options = { expiresIn: "1d" };
    const secret = process.env.SECRET;
    const token = jwt.sign(payload, secret, options);

    // Return a success response
    return {
      success: true,
      data: {
        user: newUser,
        token,
      },
    };
  } catch (error) {
    // Error handling
    console.error("Error in createUser:", error.message);
    return {
      success: false,
      message: "Failed to create user",
      error: error.message,
    };
  }
};


const findAllUsers = async () => {
  try {
    const users = await User.findAll();
    return { success: true, data: users };
  } catch (error) {
    return { success: true, error: error.message };
  }
};

const loginUser = async (credentials) => {
  try {
    const { email , national_number, password } = credentials;

    // Determine if credentials contain email or national number
    const isEmail = Boolean(email);

    // Find user by either email or national number
    const user = await User.findOne({
      where: isEmail ? { email } : { national_number },
    });

    // Check if user exists
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Compare provided password with stored hashed password
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return { success: false, message: "Password or email is incorrect" };
    }

    // Generate token if login is successful
    const payload = {
      userId: user.user_id,
      country: user.nationality,
      userName: user.username,
      role: user.role_id,
      firstName: user.first_name,
      lastName: user.last_name,
      profile_photo: user.profile_photo, // Reference the correct field
    };
    const options = { expiresIn: "1d" };
    const secret = process.env.SECRET;

    const token = jwt.sign(payload, secret, options);

    // Return successful response with user data and token
    return {
      success: true,
      data: token,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const acceptOwnerRequestService = async (requestId, role) => {
  if (role !== 3) {
    return { success: false, message: "Unauthorized" };
  }
  const request = await OwnersRentalRequest.findByPk(requestId);

  if (!request) {
    return { success: false, message: "failed to change the role" };
  }
  try {
    await OwnersRentalRequest.update(
      { request_state: "approved" }, // Values to update
      { where: { request_id: requestId } }
    );
    await User.update({ role_id: 2 }, { where: { user_id: request.user_id } });
  } catch (error) {
    return { success: false, error: error.message };
  }
  return {
    success: true,
    message: `the role for ${request.user_id} is changed and request is approved`,
  };
};

const RequestToBecomeRenterService = async (userId) => {
  const user = await User.findByPk(userId);
  if (user) {
    const newRequest = await OwnersRentalRequest.create({ user_id: userId });
    return { success: true, data: newRequest };
  } else {
    return { success: false, message: "failed to create a request" };
  }
};

const getAllOwnersRequestsService = async (role) => {
  if (role !== 3) {
    return { success: false, message: "Unauthorized" };
  }
  try {
    const requests = await OwnersRentalRequest.findAll();
    if (!requests) {
      return { success: false, message: "unable to load requests" };
    }
    return { success: true, data: requests };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const refreshToken = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return { success: false, message: "user not found" };
    }

    // Generate token if user is found
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

    return { success: true, data: token };
  } catch (error) {
    return { success: false, erorr: error.message };
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
};
