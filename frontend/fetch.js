import axios from "axios";

// const baseURL = "http://127.0.0.1:8000/api/";
const baseURL = "https://api.thefounderscube.com/api/";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    // "Content-Type": "application/json",
  },
});

export const setAuthorizationToken = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Axios GET request
export const get = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    if (!error.response.data) {
      alert("There seems to be a problem. Pease try again later");
    } else {
      throw error;
    }
  }
};

// Axios POST request
export const post = async (url, data = {}) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    if (!error.response.data) {
      alert("There seems to be a problem. Pease try again later");
    } else {
      throw error;
    }
  }
};

// Axios PUT request
export const put = async (url, data = {}) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    if (!error.response.data) {
      alert("There seems to be a problem. Pease try again later");
    } else {
      throw error;
    }
  }
};

// Axios DELETE request
export const remove = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    if (!error.response.data) {
      alert("There seems to be a problem. Pease try again later");
    } else {
      throw error;
    }
  }
};