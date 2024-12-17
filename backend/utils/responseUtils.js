const successResponse = (data, message = "Success") => ({
  success: true,
  message,
  data,
});

const errorResponse = (error, message = "An error occurred") => ({
  success: false,
  message,
  error: error.message || error,
});

module.exports =  { successResponse, errorResponse };
