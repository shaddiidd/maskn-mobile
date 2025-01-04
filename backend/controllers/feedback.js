const feedbackService = require("../services/feedbackService");
const AppError = require("../utils/AppError");

// const calculateAndUpdateRating = async (req, res, next) => {
//   try {
//     const { responses } = req.body; // Extract user responses
//     const { role } = req.token; // Extract role from token
//     const { entityId, contractId } = req.params; // Extract entity and contract ID from route parameters

//     if (!role || ![1, 2].includes(role)) {
//       return next(
//         new AppError(
//           "Invalid role provided",
//           400 // Bad Request
//         )
//       );
//     }

//     // Determine user type based on role
//     const userType = role === 1 ? "tenant" : "owner";

//     // Validate contract and ensure it's related to the entity
//     await feedbackService.validateContract(contractId, entityId, userType);

//     // Calculate and update the rating
//     const averageRating = await feedbackService.calculateAndUpdateRatings(
//       entityId,
//       userType,
//       responses // Pass the responses to the service
//     );

//     res.success(averageRating, `${userType === "tenant" ? "Property" : "Tenant"} rating updated successfully` , 200)
//   } catch (error) {
//     next(
//       new AppError(
//         error.message || "Failed to calculate and update rating",
//         error.statusCode || 500,
//         error.details
//       )
//     );
//   }
// };

// controllers/feedbackController.js

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

// const saveSurvey = async (req, res, next) => {
//   try {
//     const { role, userId } = req.token; // Extract role and user ID from token
//     const { entityId, contractId } = req.params; // Extract entity ID and contract ID from params
//     const { answers, review } = req.body; // Extract answers from the request body

//     if (!role || ![1, 2].includes(role)) {
//       return next(new AppError("Invalid role provided", 403));
//     }

//     const result = await feedbackService.saveSurveyAndUpdateRating(
//       userId,
//       entityId,
//       contractId,
//       answers,
//       role,
//       review
//     );

//     // res.status(200).json(result);
//     res.success(result, "survey has been filled", 200);
//   } catch (error) {
//     next(
//       new AppError(
//         error.message || "Failed to save survey or update rating",
//         error.statusCode || 500
//       )
//     );
//   }
// };

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
