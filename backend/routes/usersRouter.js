const express = require("express")
const userRouter = express.Router();
const userService = require("../services/userService")

const{sginUp, getallusers, login}= require("../controllers/users")

userRouter.post("/sginUp", sginUp)
userRouter.get("/",getallusers)
userRouter.post("/login", login)

module.exports = userRouter
