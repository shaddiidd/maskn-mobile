const express = require("express");
const feedbackRouter = express.Router();
const authentication = require("../middleware/authentication");
const {
  saveSurvey,
  checkSurveySubmission,
  getFeedbackByRole
} = require("../controllers/feedback");

feedbackRouter.get(
  "/check-filled-survey",
  authentication,
  checkSurveySubmission
);

feedbackRouter.post("/survey-submission/:entityId/:contractId", authentication, saveSurvey)
feedbackRouter.get("/get-survey", authentication, getFeedbackByRole)

module.exports = feedbackRouter;
