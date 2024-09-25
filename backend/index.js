const express = require("express");
const app = express();

// import articles Router
const articlesRouter = require("./routes/articles");


app.use(express.json());

// articles Router
app.use("/articles", articlesRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT http://localhost:${PORT}`);
});
