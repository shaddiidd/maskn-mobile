const express = require("express");
const authRouter = express.Router();

const {requestOtp,verifyOtpAndUpdatePassword,  } = require("../controllers/auth");

authRouter.post("/request-otp", requestOtp);
authRouter.post("/verify-otp", verifyOtpAndUpdatePassword);
module.exports = authRouter;
