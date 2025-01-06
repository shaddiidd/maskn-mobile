const User = require("../models/users");
const admin = require("../config/firebase");
const AppError = require("../utils/AppError");

const sendOtp = async (phone) => {
  try {
    // Firebase sends OTP to the provided phone number
    const sessionInfo = await admin.auth().createCustomToken(phone);
    return { message: "OTP sent successfully.", sessionInfo };
  } catch (error) {
    throw new AppError("Failed to send OTP: " + error.message);
  }
};

const verifyOtp = async (phone, otp) => {
  try {
    // Verify OTP using Firebase
    const decodedToken = await admin.auth().verifyIdToken(otp);
    if (decodedToken.phone_number !== phone) {
      throw new Error("Invalid OTP or phone number mismatch.");
    }
    return { message: "OTP verified successfully." };
  } catch (error) {
    throw new Error("Failed to verify OTP: " + error.message);
  }
};

const updatePassword = async (phone, newPassword) => {
  try {
    const user = await User.findOne({ where: { phone_number: phone } });
    if (!user) {
      throw new AppError("User not found", 404);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await user.update({ password: hashedPassword });
    return { message: "Password updated successfully" };
  } catch (error) {
    throw new AppError(`Failed to update password: ${error.message}`, 500);
  }
};

module.exports = { sendOtp, verifyOtp, updatePassword };
