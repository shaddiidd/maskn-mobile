const express = require("express")
const userRouter = express.Router();
const userService = require("../services/userService")

const{signUp, getallusers, login,requestToBecomeRenter}= require("../controllers/users")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")

userRouter.post("/signUp", signUp)
userRouter.get("/",authentication, authorization("Manage Users") ,getallusers)
userRouter.post("/login", login)
userRouter.post("/request-to-be-renter",authentication,requestToBecomeRenter)

module.exports = userRouter
