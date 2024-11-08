const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const createUser = async (userData) => {
  const {
    username,
    first_name,
    last_name,
    national_number,
    date_of_birth,
    password,
    nationality,
    rating,
    email,
    role_id,
  } = userData;

  const hashedPassword = await bcrypt.hash(password, 3);

  const newUser = await User.create({
    username,
    first_name,
    last_name,
    national_number,
    date_of_birth,
    password: hashedPassword,
    nationality,
    rating,
    email,
    role_id,
  });

  return newUser;
};

const findAllUsers = async () => {
  try {
    const users = await User.findAll();
    return { success: true, data: users };
  } catch (error) {
    return { success: true, error: error.message };
  }
};

const loginUser = async (credentials) => {
    try {
      const { email, national_number, password } = credentials;
  
      // Determine if credentials contain email or national number
      const isEmail = Boolean(email);
  
      // Find user by either email or national number
      const user = await User.findOne({
        where: isEmail ? { email } : { national_number }
      });
  
      // Check if user exists
      if (!user) {
        return { success: false, message: "User not found" };
      }
  
      // Compare provided password with stored hashed password
      const isPasswordMatch = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatch) {
        return { success: false, message: "Password or email is incorrect" };
      }
  
      // Generate token if login is successful
      const payload = {
        userId: user.user_id,
        country: user.nationality,
        role : user.role_id 
      };
      const options = { expiresIn: "1d" };
      const secret = process.env.SECRET;
  
      const token = jwt.sign(payload, secret, options);
  
      // Return successful response with user data and token
      return {
        success: true,
        data: {
          token,
          userId: user.user_id,
          username: user.username, // Adjust to match the field name in your model
          role: user.role_id,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const changeRoleToRenter = async(userId)=>{
    const result = await User.update({role_id : 2},{where : {user_id : userId}})
    if(result){
      return {success : true, message : `the role for ${userId} is changed`}
    }else{
      return {success : false , message : "failed to change the role"}
    }
  }
  
module.exports = {
  createUser,
  findAllUsers,
  loginUser,
  changeRoleToRenter
};
