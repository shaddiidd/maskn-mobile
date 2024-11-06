const express = require("express")
const authRouter = express.Router();

const {requestResetPassword, resetPassword} = require("../controllers/auth")

authRouter.post("/request-password-reset", requestResetPassword)
authRouter.post("/request-reset", resetPassword)


module.exports = authRouter