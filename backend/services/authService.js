const User = require("../models/users");
const admin = require("../config/firebase");
const AppError = require("../utils/AppError");
const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const { log } = require("handlebars");
require("dotenv").config();

// Twilio credentials
const accountSid = "ACb75a847a1f7e61fde31e0705ac7699a8";
const authToken = "507f82fdea3ce1b90b23a73ee8bae5b4";
const verifyServiceSid = "VAc1880cdca240cd764a7d8e317267f920";

const client = twilio(accountSid, authToken);

const requestOtp = async (phoneNumber) => {
  try {
    const user = await User.findOne({ where: { phone_number: phoneNumber } });

    if (!user)
      throw new AppError("user with tis phone number is not found", 404);

    const phone = "+962779582933";
    const verification = await client.verify.v2
      .services("VAc1880cdca240cd764a7d8e317267f920")
      .verifications.create({ to: phone, channel: "sms" });

    return verification.status; // E.g., "pending"
  } catch (error) {
    throw new AppError(`Failed to send OTP: ${error.message}`, 500);
  }
};

const verifyOtp = async (phoneNumber, otp) => {
  try {
    // Verify OTP using twilio
    const user = await User.findOne({ where: { phone_number: phoneNumber } });
    const phone = "+962779582933";
    const result = await client.verify.v2
      .services("VAc1880cdca240cd764a7d8e317267f920")
      .verificationChecks.create({ to: phone, code: otp });

      console.log(result);
      
    if (result.status === "approved") {
      const payload = {
        userId: user.user_id,
        country: user.nationality,
        userName: user.username,
        role: user.role_id,
        firstName: user.first_name,
        lastName: user.last_name,
        profile_photo: user.profile_photo,
        date_of_birth: user.date_of_birth,
        national_number: user.national_number,
        email: user.email,
        rating: user.rating,
        phone_number: user.phone_number,
      };
      const options = { expiresIn: "1d" };
      const secret = process.env.SECRET;

      const token = jwt.sign(payload, secret, options);
      return { result, token };
    }
  } catch (error) {
    throw new AppError("Failed to verify OTP: " + error.message, 500);
  }
};

module.exports = { requestOtp, verifyOtp };
