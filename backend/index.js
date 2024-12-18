const express = require("express");
const cors = require("cors");
const responseHandler = require("./middleware/responseHandler");
const errorHandler = require("./middleware/errorHandler");
const userRouter = require("./routes/usersRouter");
const propertyRouter = require("./routes/propertyRoute");
const authRouter = require("./routes/authRoutes");
const contractRouter = require("./routes/contractRoute");

// require('./models/db')
require("./models/index");

require("dotenv").config();
// import articles Router
const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(responseHandler);

// Routeres
app.use("/users", userRouter);
app.use("/property", propertyRouter);
app.use("/auth", authRouter);
app.use("/contract", contractRouter);
app.use(errorHandler);
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen("5002", () => {
  console.log(`SERVER LISTENING AT http://localhost:${PORT}`);
});
