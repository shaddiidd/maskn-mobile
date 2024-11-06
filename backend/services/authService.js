const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cron = require('node-cron');

const generateResetToken = async (user) => {
  console.log(user);
  
  // this for the content of the payload of the token
  const payload = {
    userId: user.user_id,
  };
  console.log(payload);
  
  const options = { expiresIn: "1h" };
  console.log(options);
  
  const secret = process.env.SECRET;

  
  //the rest token gentration
  const resetToken = jwt.sign(payload, secret, options);

   
  //assging the generated token to the rest token column in the user table
  user.reset_token = resetToken;
  
  //assiging the expiration to the column in the user table
  user.reset_token_expiration = new Date(Date.now() + 3600000);

  

  await User.update(
    { reset_token : resetToken, reset_token_expiration: user.reset_token_expiration },
    { where: { user_id: user.user_id } }
  );

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
    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

const updatePassword = async(user, newPassword) =>{
  
  console.log("this user: ",user);
  

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.update({password : hashedPassword ,reset_token : null, reset_token_expiration: null },
    { where: { user_id: user.user_id } })
}

cron.schedule('0 0 * * *', async () => {
  try {
    const users = await User.findAll();
    const now = new Date();

    await Promise.all(users.map(async (user) => {
      if (user.resetTokenExpiration && new Date(user.resetTokenExpiration) < now) {
        user.resetToken = null;
        user.resetTokenExpiration = null;
        await user.save();
      }
    }));

    console.log('Expired tokens cleared');
  } catch (error) {
    console.error('Error clearing expired tokens:', error);
  }
});


module.exports = { generateResetToken, sendResetEmail, verifyResetToken, updatePassword };
