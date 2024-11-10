const express = require("express")
const userRouter = express.Router();
const userService = require("../services/userService")

const{signUp, getallusers, login}= require("../controllers/users")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")

userRouter.post("/signUp", signUp)
userRouter.get("/",authentication, authorization("Manage Users") ,getallusers)
userRouter.post("/login", login)

module.exports = userRouter
