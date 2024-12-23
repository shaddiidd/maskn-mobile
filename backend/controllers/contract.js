const contractService = require('../services/contractService');
const AppError = require('../utils/AppError'); // Assuming this is your custom error class

const generateContract = async (req, res, next) => {
  try {
    const requestId = req.params.requestId; // Extract request ID from URL parameters
    const ownerId = req.token.userId; // Extract user ID from token
    const { startDate, endDate, additionalTerms } = req.body; // Extract contract data

    // Call the service to generate the contract
    const contractHtml = await contractService.createContract(
      { startDate, endDate, additionalTerms },
      requestId,
      ownerId
    );

    // Check if the contract service returned an error response
    if (!contractHtml.success) {
      return next(
        new AppError(
          contractHtml.message || 'Invalid contract data',
          400 // Bad Request
        )
      );
    }

    // Send success response
    res.success(
      contractHtml, // Data
      'Contract generated successfully', // Message
      200 // Status code
    );
  } catch (error) {
    // Forward errors to the centralized error handler
    next(
      new AppError(
        error.message || 'Failed to generate contract',
        error.statusCode || 500,
        error.details
      )
    );
  }
};

module.exports = { generateContract };

