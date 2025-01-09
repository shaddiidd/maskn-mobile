const authService = require("../services/authService");
const AppError = require("../utils/AppError");

const requestOtp = async (req, res, next) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return next(new AppError("Phone number is required", 400));
  }

  try {
    const status = await authService.requestOtp(phoneNumber);
    res.success(status, "OTP sent successfully", 200);
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to fetch notifications",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const verifyOtpAndUpdatePassword = async (req, res, next) => {
  const { otp, phoneNumber } = req.body;

  if (!otp || !phoneNumber) {
    return next(new AppError("OTP and phone number are required", 400));
  }

  try {
    const verificationResult = await authService.verifyOtp(phoneNumber, otp);

    if (verificationResult.result.status === "approved") {
      res.success(verificationResult, "the otp is verified", 200);
    } else {
      return next(
        new AppError("Verification failed", 400, verificationResult.status)
      );
    }
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to fetch notifications",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

module.exports = { requestOtp, verifyOtpAndUpdatePassword };
