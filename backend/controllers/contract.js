const contractService = require("../services/contractService");
const AppError = require("../utils/AppError"); // Assuming this is your custom error class
const fs = require("fs");
const path = require("path");
const generateContract = async (req, res, next) => {
  try {
    const requestId = req.params.requestId; // Extract request ID from URL parameters
    const ownerId = req.token.userId; // Extract user ID from token

    // Call the service to generate the contract
    const contractHtml = await contractService.createContract(
      requestId,
      ownerId
    );

    // Check if the contract service returned an error response
    if (!contractHtml) {
      return next(
        new AppError(
          contractHtml.message || "Invalid contract data",
          400 // Bad Request
        )
      );
    }

    // Send success response
    res.success(
      contractHtml, // Data
      "Contract generated successfully", // Message
      200 // Status code
    );
  } catch (error) {
    // Forward errors to the centralized error handler
    next(
      new AppError(
        error.message || "Failed to generate contract",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const previewContract = async (req, res, next) => {
  try {
    const userId = req.token.userId;
    const contractId = req.params.contractId;

    console.log("userId:", userId, "contractId:", contractId);

    const pdfBuffer = await contractService.previewContractService(
      userId,
      contractId
    );
    console.log("pdfBuffer : ", pdfBuffer);

    // Set the response headers for serving the PDF file
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `inline; filename="contract_${contractId}.pdf"`
    );

    // Send the PDF buffer directly
    res.end(pdfBuffer);
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to generate contract",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const signContract = async (req, res, next) => {
  try {
    console.log("anas");

    const contractId = req.params.contractId;
    const userId = req.token.userId;

    // Call the service to sign the contract
    const result = await contractService.signContractService(
      userId,
      contractId,
      req.body
    );

    // Send success response
    res.success(result, "Contract signed successfully", 200);
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to sign contract",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const getContractTerms = async (req, res, next) => {
  try {
    // const { termNumber, newTerm } = req.body;
    const ownerId = req.token.userId;
    const contractId = req.params.contractId;
    console.log(contractId);

    const result = await contractService.getContractTermsService(
      ownerId,
      contractId
      // { termNumber, newTerm }
    );

    console.log(result);

    res.success(result, "contract terms updated successfully", 200);
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to update terms of contract",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const updateContract = async (req, res, next) => {
  try {
    const ownerId = req.token.userId;
    const { contractId } = req.params;
    const { termId } = req.query;
    const { term } = req.body;

    // Validate input
    if (!term) {
      return res.status(400).json({ message: "Term content is required." });
    }

    // Call the service
    const result = await contractService.updateContractTerm(
      ownerId,
      contractId,
      termId,
      term
    );

    res.status(200).json(result);
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to update terms of contract",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const deleteContract = async (req, res, next) => {
  try {
    const contractId = req.params.contractId; // Extract contract ID from the route
    const userId = req.token.userId; // Extract user ID from the authenticated user

    const response = await contractService.deleteContractService(
      contractId,
      userId
    );

    res.status(200).json(response);
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to update terms of contract",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

const deleteTerm = async (req, res, next) => {
  try {
    const { contractId } = req.params;
    const { termId } = req.params;
    const ownerId = req.token.userId; // Assuming `ownerId` is retrieved from the authenticated user's token

    const result = await contractService.deleteTermById(
      contractId,
      ownerId,
      termId
    );

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to update terms of contract",
        error.statusCode || 500,
        error.details
      )
    ); // Forward to error handling middleware
  }
};

const getAllContracts = async (req, res, next) => {
  try {
    const allContracts = await contractService.getAllContracts();
    res.success(allContracts, "all contracts retrived", 200);
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to update terms of contract",
        error.statusCode || 500,
        error.details
      )
    );
  }
};
const getRentalHistoryByUserId = async (req, res, next) => {
  try {
    const userId = req.token.userId;
    const result = await contractService.getRentalHistoryByUserIdService(
      userId
    );

    res.success(result, "user rental history retrived", 200);
  } catch (error) {
    next(
      new AppError(
        error.message || "failed to retrive user rental history",
        error.status || 500,
        error.details
      )
    );
  }
};

module.exports = {
  generateContract,
  previewContract,
  signContract,
  getContractTerms,
  updateContract,
  deleteContract,
  deleteTerm,
  getAllContracts,
  getRentalHistoryByUserId
};
