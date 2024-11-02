const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const generateResetToken = async (user) => {
  // this for the content of the payload of the token
  const payload = {
    userId: user.user_id,
  };
  const options = { expiresIn: "1h" };
  const secret = process.env.SECRET;
  //the rest token gentration
  const resetToken = jwt.sign(payload, options, secret);
  //assging the generated token to the rest token column in the user table
  user.reset_token = resetToken;
  //assiging the expiration to the column in the user table
  user.reset_token_expiration = Date.now() + 3600000;

  await user.save();

  return resetToken;
};

const sendResetEmail = async (email, resetToken) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: "Password Reset Request",
    html: `<p>Click this <a href="http://localhost:3000/reset/${resetToken}">link</a> to reset your password.</p>`,
  });
};

const verifyResetToken = (token) => {
  try {
    return jwt.verify(token, "your_secret_key");
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

const updatePassword = async(user, newPassword) =>{
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.reset_token = null;
  user.reset_token_expiration = null;
  await user.save()
}
module.exports = { generateResetToken, sendResetEmail, verifyResetToken, updatePassword };
