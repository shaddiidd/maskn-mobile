const express = require("express")
const userRouter = express.Router();

const{sginUp, getallusers, login}= require("../controllers/users")

userRouter.post("/sginUp", sginUp)
userRouter.get("/users",getallusers)
userRouter.post("/login", login)

module.exports = userRouter
