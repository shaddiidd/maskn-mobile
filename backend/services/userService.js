const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const OwnersRentalRequest = require("../models/ownerRentalRequests");
const { where } = require("sequelize");

const createUser = async (userData) => {
  const {
    username,
    first_name,
    last_name,
    national_number,
    date_of_birth,
    password,
    nationality,
    email,
  } = userData;

  const hashedPassword = await bcrypt.hash(password, 3);
  const role = 1;
  const defualtRating = 5;
  const newUser = await User.create({
    username,
    first_name,
    last_name,
    national_number,
    date_of_birth,
    password: hashedPassword,
    nationality,
    rating: defualtRating,
    email,
    role_id: role,
  });

  const payload = {
    userId: newUser.user_id,
    country: newUser.nationality,
    role: newUser.role_id,
  };
  const options = { expiresIn: "1d" };
  const secret = process.env.SECRET;

  const token = jwt.sign(payload, secret, options);

  // Return successful response with user data and token
  return {
    success: true,
    data: {
      newUser,
      token,
      userId: newUser.user_id,
      username: newUser.username, // Adjust to match the field name in your model
      role: newUser.role_id,
      name: { firstName: newUser.first_name, lastName: newUser.last_name },
    },
  };
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
    const { email, national_number, password } = credentials;

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
      role: user.role_id,
    };
    const options = { expiresIn: "1d" };
    const secret = process.env.SECRET;

    const token = jwt.sign(payload, secret, options);

    // Return successful response with user data and token
    return {
      success: true,
      data: {
        token,
        userId: user.user_id,
        username: user.username, // Adjust to match the field name in your model
        role: user.role_id,
        name: { firstName: user.first_name, lastName: user.last_name },
      },
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const acceptOwnerRequestService = async (requestId, role) => {
  console.log(requestId);

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
    await User.update({ role_id: 2}, {where: { user_id: request.user_id } });
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

module.exports = {
  createUser,
  findAllUsers,
  loginUser,
  acceptOwnerRequestService,
  RequestToBecomeRenterService,
};
