const express = require("express");
const feedbackRouter = express.Router();
const authentication = require("../middleware/authentication");
const {
  saveSurvey,
  checkSurveySubmission,
} = require("../controllers/feedback");

feedbackRouter.get(
  "/check-filled-survey",
  authentication,
  checkSurveySubmission
);

feedbackRouter.post("/survey-submission/:entityId/:contractId", authentication, saveSurvey)

module.exports = feedbackRouter;
