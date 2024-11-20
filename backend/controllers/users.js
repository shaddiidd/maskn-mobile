const userService = require("../services/userService");

const signUp = async (req, res) => {
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
        message: err.errors.message,
        error: err.errors.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: err.errors,
      });
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

const requestToBecomeRenter = async (req, res) => {
  const userId = req.token.userId;

  const result = await userService.RequestToBecomeRenterService(userId);

  if (result) {
    return res.status(200).json({
      success: true,
      message: `Request for ${userId} has been sent`,
      data: result.data,
    });
  } else {
    return res.status(500).json({
      success: false,
      message: `Request for ${userId} has failed`,
      data: result.data,
    });
  }
};

const acceptOwnerRequest = async (req, res) => {
  const role = req.token.role;
  const requestId = req.params.requestId;

  const result = await userService.acceptOwnerRequestService(requestId, role);

  if (result.success == true) {
    return res.status(200).json({
      success: true,
      message: `Request for  has been approved`,
      data: result.data,
    });
  } else {
    return res.status(500).json({
      success: false,
      data: result,
    });
  }
};

const getAllOwnersRequests = async (req, res) => {
  const result = await userService.getAllOwnersRequestsService(req.token.role);

  if (result.success == true) {
    return res.status(200).json({
      success: true,
      message: `All owners requests`,
      data: result.data,
    });
  } else {
    return res.status(500).json({
      success: false,
      data: result,
    });
  }
};

const generateNewToken = async (req, res) => {
  const userId = req.token.userId;
  
  if (!userId) {
    return res
      .status(401)
      .json({ success: false, message: "Token is required" });
  }
  try {
    const result = await userService.refreshToken(userId);
    if (result) {
      return res.status(200).json({
        success: true,
        data: result,
      });
    }
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  signUp,
  getallusers,
  login,
  requestToBecomeRenter,
  acceptOwnerRequest,
  getAllOwnersRequests,
  generateNewToken
};
