const express = require("express");
const contractRouter = express.Router();
const authentication = require("../middleware/authentication")
const {generateContract} = require("../controllers/contract")

contractRouter.post("/intiate-contract/:requestId",authentication, generateContract )

module.exports = contractRouter