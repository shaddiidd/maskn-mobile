const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/users");
require('./models/db')

require('dotenv').config();
// import articles Router
const app = express();
const PORT = process.env.PORT 

app.use(cors());
app.use(express.json());

// Routeres
app.use("/users",userRouter)
// Handles any other endpoints [unassigned - endpoints]
app.use("*", (req, res) => res.status(404).json("NO content at this path"));


app.listen(PORT, () => {
  console.log(`SERVER LISTENING AT http://localhost:${PORT}`);
});
