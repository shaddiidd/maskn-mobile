const express = require("express")
const userRouter = express.Router();
const userService = require("../services/userService")

const{sginUp, getallusers, login}= require("../controllers/users")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")

userRouter.post("/sginUp", sginUp)
userRouter.get("/",authentication, authorization("Manage Users") ,getallusers)
userRouter.post("/login", login)

module.exports = userRouter
