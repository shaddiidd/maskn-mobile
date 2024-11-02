const { where } = require("sequelize");
const User = require("../models/users");
const authService = require("../services/authService");
const requestResetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
    } else {
      const resetToken = await authService.generateResetToken(user);
      await authService.sendResetEmail(user.email, resetToken);

      res
        .status(200)
        .json({ success: true, message: "reset password link has been sent" });
    }
  } catch (error) {
    res.status.json({ success: false, error: error });
  }
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const decodedToken = authService.verifyResetToken(token);
    const user = User.findOne({
      where: {
        user_id: token.userId,
        rest_token: token,
        reset_token_expiration: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      res
        .status(400)
        .json({ success: false, message: "token expiered or invalid" });
    } else {
      await passwordResetService.updatePassword(user, newPassword);
      res.status(200).json({ message: "Password has been reset successfully" });
    }
  } catch (error) {}
};

module.exports = { requestResetPassword };
