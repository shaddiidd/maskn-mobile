const User = require("../models/users");
const AppError = require("../utils/AppError");
const twilio = require("twilio");
const jwt = require("jsonwebtoken");
const { twilio: twilioConfig } = require("../config/twilioConfig");

const client = twilio(twilioConfig.accountSid, twilioConfig.authToken);

const requestOtp = async (phoneNumber) => {
  try {
    const user = await User.findOne({ where: { phone_number: phoneNumber } });

    if (!user)
      throw new AppError("user with tis phone number is not found", 404);

    const phone = "+962779582933";
    const verification = await client.verify.v2
      .services(twilioConfig.verifyServiceSid)
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
      .services(twilioConfig.verifyServiceSid)
      .verificationChecks.create({ to: phone, code: otp });

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
