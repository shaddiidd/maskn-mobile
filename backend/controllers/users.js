const pool = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const sginUp = async (req, res) => {
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
    role_id
  } = req.body;

  const hasedPassword = await bcrypt.hash(password, 3);

  const placeholder = [
    username,
    first_name,
    last_name,
    national_number,
    date_of_birth,
    hasedPassword,
    nationality,
    rating,
    email,
    role_id
  ];

  const queryString = `INSERT INTO users (username, first_name, last_name, national_number, date_of_birth, password, nationality, rating, email, role_id) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9,$10);`;

  pool
    .query(queryString, placeholder)
    .then((result) => {
      if (!result) {
        res.status(409).json({
          success: false,
          message: "The email already exists",
          error: result,
        });
      } else {
        res.status(201).json({
          success: true,
          message: "Account created successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        error: err,
      });
      console.log(err);
    });
};

const getallusers = (req, res) => {
  const query = `SELECT * FROM USERS WHERE national_number = '1234567899'`;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All the articles",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const login = (req, res) => {
  const { national_number, password } = req.body;

  const query = `SELECT * FROM users WHERE national_number = $1`;
  const placeholder = [national_number];

  pool
    .query(query, placeholder)
    .then((result) => {
      // Check if the user exists
      if (result.rows.length === 0) {
        return res.status(403).json({
          success: false,
          message: `The user doesn’t exist or the password is incorrect`,
        });
      }

      const user = result.rows[0];
      console.log(user);
      
      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (err, response) => {
        if (err) {
          return res.status(500).json({
            success: false,
            message: "Error during password comparison",
            error: err.message,
          });
        }
        

        if (response) {
          // Password is correct, generate JWT
          const payload = {
            userId: user.user_id,
            country: user.nationality,
          };
          const options = { expiresIn: "1d" };
          const secret = process.env.SECRET;

          const token = jwt.sign(payload, secret, options);
          return res.status(200).json({
            success: true,
            message: `Valid login credentials`,
            token,
            userId: user.user_id, // Return just the user_id, not the whole user object for security
          });
        } else {
          // Password doesn't match
          return res.status(403).json({
            success: false,
            message: `The user doesn’t exist or the password is incorrect`,
          });
        }
      });
    })
    .catch((err) => {
      // Handle errors (like DB errors)
      return res.status(500).json({
        success: false,
        message: "Server error during login",
        error: err.message,
      });
    });
};

module.exports = { sginUp, getallusers, login };
