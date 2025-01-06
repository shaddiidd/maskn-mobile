const feedbackService = require("../services/feedbackService");
const AppError = require("../utils/AppError");

const getFeedbackByRole = async (req, res, next) => {
  try {
    const { role } = req.token; // Assuming `role` comes from the request params
    if (!role) {
      throw new AppError("Role is required", 403);
    }

    const feedback = await feedbackService.getFeedbackByRole(role);
    res.success(feedback, "survey questions retrived", 200);
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to save survey or update rating",
        error.statusCode || 500
      )
    ); // Pass the error to the global error handler
  }
};


const saveSurvey = async (req, res, next) => {
  try {
    const { role, userId } = req.token; // Extract role and user ID from token
    const { entityId, contractId } = req.params; // Extract entity ID and contract ID from params
    const { answers, review } = req.body; // Extract answers and review from the request body

    // Validate role
    if (!role || ![1, 2].includes(role)) {
      return next(new AppError("Invalid role provided", 403));
    }

    // Call the service to save the survey and update the rating
    const result = await feedbackService.saveSurveyAndUpdateRating(
      userId,
      entityId,
      contractId,
      answers,
      role,
      review
    );

    // Respond with success
    res.success(result, "Survey has been filled successfully", 200);
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to save survey or update rating",
        error.statusCode || 500
      )
    );
  }
};

module.exports = { saveSurvey };


const checkSurveySubmission = async (req, res, next) => {
  try {
    const userId = req.token.userId;
    const userRole = req.token.role;

    const result = await feedbackService.checkSurveySubmissionService(
      userId,
      userRole
    );
    res.success(result, "user submission has been retrived", 200);
  } catch (error) {
    next(
      new AppError(
        error.message || "Failed to fetch notifications",
        error.statusCode || 500,
        error.details
      )
    );
  }
};

module.exports = { saveSurvey, checkSurveySubmission, getFeedbackByRole };
