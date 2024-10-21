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
    created_at,
  } = req.body;

  const hasedPassword = await bcrypt.hash(password, 3);
  console.log(hasedPassword);
  console.log();
  
  const placeholder = [
    username,
    first_name,
    last_name,
    national_number,
    date_of_birth,
    hasedPassword,
    nationality,
    rating,
    created_at,
  ];

  const queryString =
    'INSERT INTO users (username, first_name, last_name, national_number, date_of_birth, password, nationality, rating, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP);'

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
    });
};

module.exports = { sginUp };
