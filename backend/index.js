const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/usersRouter");
const propertyRouter = require("./routes/propertyRoute");
require('./models/db')

require('dotenv').config();
// import articles Router
const app = express();
const PORT = process.env.PORT 

app.use(cors());
app.use(express.json());

// Routeres
app.use("/users",userRouter)
app.use("/property", propertyRouter)
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));


app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT http://localhost:${PORT}`);
});
