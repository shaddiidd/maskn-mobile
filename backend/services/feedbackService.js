const TenantPropertyFeedback = require("../models/tenantPropertyFeedback");
const TenantAnswer = require("../models/tenantAnswers");
const OwnerAnswer = require("../models/ownerAnswers");
const Property = require("../models/properties");
const User = require("../models/users");
const OwnerRentalExperience = require("../models/ownerRentalExperience");
const AppError = require("../utils/AppError");
const Contract = require("../models/contract");

const getFeedbackByRole = async (role) => {
  try {
    if (role === 1) {
      // Fetch tenant feedback
      return await TenantFeedback.findAll();
    } else if (role === 2) {
      // Fetch owner rental experience
      return await OwnerRentalExperience.findAll();
    } else {
      throw new Error("Invalid role");
    }
  } catch (error) {
    throw new AppError("survey cant be retrived", 404);
  }
};

const saveSurveyAndUpdateRating = async (
  userId,
  entityId,
  contractId,
  answers,
  userRole
) => {
  try {
    const isOwner = userRole === 2;
    const model = isOwner ? OwnerAnswer : TenantAnswer;
    const questionModel = isOwner
      ? OwnerRentalExperience
      : TenantPropertyFeedback;
    const relatedModel = isOwner ? User : Property;
    const idField = isOwner ? "tenant_id" : "property_id";
    const maxWeight = isOwner ? 85 : 88;

    const existingFeedback = await model.findOne({
      where: { contract_id: contractId },
    });
    if (existingFeedback) {
      throw new AppError(
        "Feedback for this contract has already been submitted",
        400
      );
    }

    // Step 1: Save answers
    const answersToSave = answers.map((answer) => ({
      [isOwner ? "owner_id" : "tenant_id"]: userId,
      [idField]: entityId,
      contract_id: contractId,
      question_id: answer.questionId,
      response_value: answer.questionAnsValue,
    }));
    console.log("Answers to save:", answersToSave);

    await model.bulkCreate(answersToSave);

    // Step 2: Fetch question weights
    const questionWeights = await questionModel.findAll({
      attributes: ["question_id", "weight"],
    });

    const weightMap = questionWeights.reduce((map, question) => {
      map[question.question_id] = question.weight;
      return map;
    }, {});
    console.log("Weight map:", weightMap);

    // Step 3: Fetch all answers
    const allAnswers = await model.findAll({
      where: { [idField]: entityId },
    });

    if (allAnswers.length === 0) {
      throw new AppError(
        `No feedback found for this ${isOwner ? "tenant" : "property"}`,
        404
      );
    }

    // Step 4: Calculate scores
    const surveyScores = {};
    allAnswers.forEach((answer) => {
      const weight = weightMap[answer.question_id];
      console.log(`Processing answer:`, {
        questionId: answer.question_id,
        responseValue: answer.response_value,
        weight,
        contribution: weight ? answer.response_value * weight : 0,
      });

      if (weight) {
        const surveyKey = answer.contract_id;
        if (!surveyScores[surveyKey]) {
          surveyScores[surveyKey] = { totalScore: 0 };
        }
        surveyScores[surveyKey].totalScore += answer.response_value * weight;
      }
    });
    console.log("Survey scores:", surveyScores);

    // Step 5: Calculate normalized scores for each survey
    const surveyRatings = Object.values(surveyScores).map((survey) => {
      const normalizedScore = (survey.totalScore / (maxWeight * 5)) * 5;
      return normalizedScore;
    });

    // Step 6: Calculate overall average rating
    const averageRating =
      surveyRatings.length > 0
        ? surveyRatings.reduce((sum, rating) => sum + rating, 0) /
          surveyRatings.length
        : null;

    // Step 7: Update the related entity's rating
    const [updatedRows] = await relatedModel.update(
      { rating: averageRating },
      { where: { [isOwner ? "user_id" : "property_id"]: entityId } }
    );

    // Step 8: Update the contract's survey field
    const surveyField = isOwner
      ? "owner_survey_filled"
      : "tenant_survey_filled";
    const [updatedContracts] = await Contract.update(
      { [surveyField]: true },
      { where: { contract_id: contractId } }
    );

    return {
      success: true,
      message: `Survey saved and ${
        isOwner ? "tenant" : "property"
      } rating updated successfully`,
      averageRating: averageRating || 0, // Return 0 if no valid ratings
    };
  } catch (error) {
    console.error("Error occurred:", error);
    throw new AppError(
      error.message ||
        `Failed to save survey or update ${
          isOwner ? "tenant" : "property"
        } rating`,
      error.statusCode || 500
    );
  }
};

const checkSurveySubmissionService = async (userId, userRole) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ where: { user_id: userId } });

    if (!user) {
      throw new AppError("User ID is not found", 404);
    }

    // Logic for owner role (userRole == 2)
    if (userRole === 2) {
      // Fetch expired contracts where owner_survey_filled is false
      const contracts = await Contract.findAll({
        where: {
          owner_id: userId,
          status: "expired",
          owner_survey_filled: false,
        },
        include: [
          {
            model: User, // Tenant details
            as: "tenant",
            attributes: [
              "username",
              "first_name",
              "last_name",
              "profile_photo",
            ],
          },
          {
            model: Property, // Property details
            as: "property",
            attributes: ["title", "photos"],
            include: [
              {
                model: User, // Owner details through the Property table
                as: "user",
                attributes: ["first_name", "last_name"], // Fetch owner name
              },
            ],
          },
        ],
        attributes: ["contract_id", "tenant_id"], // Contract attributes
      });

      if (!contracts || contracts.length === 0) {
        return []; // No expired contracts with owner_survey_filled = false
      }

      // Format the response
      return contracts.map((contract) => ({
        contract_id: contract.contract_id,
        tenant: {
          tenant_id: contract.tenant_id,
          username: contract.tenant?.username,
          first_name: contract.tenant?.first_name,
          last_name: contract.tenant?.last_name,
          profile_photo: contract.tenant?.profile_photo,
        },
        property: {
          title: contract.property?.title,
          photos: contract.property?.photos,
          owner_name: contract.property?.owner?.name,
        },
      }));
    }

    // Logic for tenant role (userRole == 1)
    if (userRole === 1) {
      // Fetch expired contracts where tenant_survey_filled is false
      const contracts = await Contract.findAll({
        where: {
          tenant_id: userId,
          status: "expired",
          tenant_survey_filled: false,
        },
        include: [
          {
            model: Property, // Property details
            as: "property",
            attributes: ["title", "photos"],
            include: [
              {
                model: User, // Owner details through the Property table
                as: "user",
                attributes: ["first_name", "last_name"], // Fetch owner name
              },
            ],
          },
        ],
        attributes: ["contract_id", "property_id"], // Contract attributes
      });

      if (!contracts || contracts.length === 0) {
        return []; // No expired contracts with tenant_survey_filled = false
      }

      // Format the response
      return contracts.map((contract) => ({
        contract_id: contract.contract_id,
        property: {
          property_id: contract.property_id,
          title: contract.property?.title,
          photos: contract.property?.photos,
          owner_name: contract.property?.owner?.name,
        },
      }));
    }

    // If userRole is neither 1 nor 2, return an empty array
    return [];
  } catch (error) {
    throw new AppError(
      error.message || "Failed to check survey submissions",
      error.statusCode || 500
    );
  }
};

module.exports = {
  getFeedbackByRole,
  // calculateAndUpdateRatings,
  saveSurveyAndUpdateRating,
  checkSurveySubmissionService,
  // validateContract,
};
