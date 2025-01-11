import axios from "axios";
import { Alert } from "react-native";
import { Buffer } from "buffer";

// const baseURL = "http://localhost:5002/";
const baseURL = "http://192.168.1.17:5002/";

const axiosInstance = axios.create({
  baseURL,
  // headers: { Accept: "application/json" },
});

export const setAuthorizationToken = (token) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const get = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    if (!error.response.data) {
      Alert.alert("Error", "There seems to be a problem. Pease try again later");
    } else {
      throw error;
    }
  }
};

export const getPdf = async (url) => {
  try {
    const response = await axiosInstance.get(url, {
      responseType: "arraybuffer",
    });

    const base64 = Buffer.from(response.data, "binary").toString("base64");

    return base64;
  } catch (error) {
    console.error("Error fetching PDF:", error.response);
    throw error;
  }
};

export const post = async (url, data = {}) => {
  try {
    const response = await axiosInstance.post(url, data);
    return response.data;
  } catch (error) {
    if (!error.response.data) {
      Alert.alert("There seems to be a problem. Pease try again later");
    } else {
      throw error;
    }
  }
};

export const put = async (url, data = {}) => {
  try {
    const response = await axiosInstance.put(url, data);
    return response.data;
  } catch (error) {
    if (!error.response.data) {
      Alert.alert("There seems to be a problem. Pease try again later");
    } else {
      throw error;
    }
  }
};

export const remove = async (url) => {
  try {
    const response = await axiosInstance.delete(url);
    return response.data;
  } catch (error) {
    if (!error.response.data) {
      Alert.alert("There seems to be a problem. Pease try again later");
    } else {
      throw error;
    }
  }
};
