const express = require("express")
const userRouter = express.Router();
const upload = require("../middleware/upload") 

const{signUp, getallusers, login,requestToBecomeRenter, acceptOwnerRequest, getAllOwnersRequests, generateNewToken}= require("../controllers/users")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")

userRouter.post("/signUp",upload.array("profile_photo", 1), signUp)
userRouter.get("/",authentication, authorization("Manage Users") ,getallusers)
userRouter.post("/login", login)
userRouter.post("/request-to-be-renter",authentication,requestToBecomeRenter)
userRouter.post("/accept-request/:requestId",authentication, authorization("Manage Users"), acceptOwnerRequest)
userRouter.get("/get-all-owner-requests",authentication, authorization("Manage Users"),getAllOwnersRequests)
userRouter.post("/generate-new-token", authentication, generateNewToken)

module.exports = userRouter
