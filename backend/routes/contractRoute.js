const express = require("express");
const contractRouter = express.Router();
const authentication = require("../middleware/authentication");
const upload = require("../middleware/upload");
const {
  generateContract,
  previewContract,
  signContract,
  getContractTerms,
  updateContract,
  deleteContract, 
  deleteTerm
} = require("../controllers/contract");

contractRouter.post(
  "/intiate-contract/:requestId",
  authentication,
  generateContract
);
contractRouter.get(
  "/preview-contract/:contractId",
  authentication,
  previewContract
);
contractRouter.post("/sign-contract/:contractId", authentication, signContract);
contractRouter.get(
  "/get-contract-terms/:contractId",
  authentication,
  getContractTerms
);
contractRouter.put("/update-contract/:contractId", authentication, updateContract)
contractRouter.delete("/delete-contract/:contractId", authentication, deleteContract)
contractRouter.delete("/delete-term/:contractId/:termId", authentication, deleteTerm)
module.exports = contractRouter;