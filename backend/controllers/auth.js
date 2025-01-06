const authService = require("../services/authService");

const requestOtp = async (req, res, next) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      throw new AppError("Phone number is required", 400);
    }

    const response = await authService.sendOtp(phone);
    res.success(response, "OTP sent successfully", 200);
  } catch (error) {
    next(new AppError(error.message || "Failed to send OTP", error.statusCode || 500));
  }
};

const verifyOtpAndUpdatePassword = async (req, res, next) => {
  try {
    const { phone, otp, newPassword } = req.body;

    if (!phone || !otp || !newPassword) {
      throw new AppError("Phone, OTP, and new password are required", 400);
    }

    // Verify OTP
    await authService.verifyOtp(phone, otp);

    // Update user password
    const response = await authService.updatePassword(phone, newPassword);
    res.success(response, "Password updated successfully", 200);
  } catch (error) {
    next(new AppError(error.message || "Failed to verify OTP or update password", error.statusCode || 500));
  }
};



module.exports = { requestOtp,  verifyOtpAndUpdatePassword};
