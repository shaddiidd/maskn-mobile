const userService = require("../services/userService");

const sginUp = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user: newUser,
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        error: err,
      });
    } else {
      res.status(500).json({
        success: false,
        error: err,
      });
      console.log(err);
    }
  }
};

const getallusers = async (req, res) => {
  const result = await userService.findAllUsers();

  if (result.success) {
    res.status(200).json({
      success: true,
      message: "All the users",
      result: result.data,
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Server error",
      err: result.error,
    });
  }
};

const login = async (req, res) => {
  const result = await userService.loginUser(req.body);

  if (result.success) {
    res.status(200).json({
      success: true,
      message: `Valid login credentials`,
      data: result.data,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: result.message || "Login failed",
    });
  }
};

module.exports = { sginUp, getallusers, login };
