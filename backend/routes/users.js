const express = require("express");
const { getAllArticles } = require("../controllers/articles");

// create articles router
const articlesRouter = express.Router();

// endpoint for the GET request
articlesRouter.get("/", getAllArticles);

module.exports = articlesRouter;
