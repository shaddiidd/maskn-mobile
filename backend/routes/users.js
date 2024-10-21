const express = require("express")
const userRouter = express.Router();

const{sginUp}= require("../controllers/users")

userRouter.post("/sginUp", sginUp)

module.exports = userRouter
