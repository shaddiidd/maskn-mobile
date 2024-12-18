const contractService = require('../services/contractService');

const generateContract = async (req, res) => {
  try {
    // Extract request ID from URL parameters
    const requestId = req.params.requestId;
    const ownerId = req.token.userId
    // Extract user-provided contract data from the request body
    const { startDate, endDate, additionalTerms } = req.body;

    // Call the service to generate the contract
    const contractHtml = await contractService.createContract(
      { startDate, endDate, additionalTerms },
      requestId,
      ownerId
    );

    // Check if the contract service returned an error response
    if (contractHtml.success === false) {
      return res.status(400).json({
        success: false,
        message: contractHtml.message,
      });
    }

    // Send the generated contract as an HTML response
    res.status(200).send(contractHtml);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to generate contract',
      error: error.message,
    });
  }
};

module.exports = { generateContract };
