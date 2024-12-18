const { where } = require("sequelize");
const User = require("../models/users");
const authService = require("../services/authService");

const requestResetPassword = 
async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    }

      const resetToken = await authService.generateResetToken(user.dataValues);
      await authService.sendResetEmail(user.dataValues.email, resetToken);

      res
        .status(200)
        .json({ success: true, message: "reset password link has been sent" });

  } catch (error) {
    res.status(500).json({ success: false, error: error });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
    
  try {
    const decodedToken = authService.verifyResetToken(token);
    
    const user = await User.findOne({
      where: {
        user_id: decodedToken.userId,
        reset_token: token,
      },
    });

    if (!user.dataValues) {
      res
        .status(400)
        .json({ success: false, message: "token expiered or invalid" });
    } 
        
      await authService.updatePassword(user.dataValues, newPassword);
      res.status(200).json({ message: "Password has been reset successfully" });
  } catch (error) {
    
    res.status(500).json({ message: 'Error resetting password', error: error });
  }
};

module.exports = { requestResetPassword, resetPassword };
