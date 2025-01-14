import React, { useEffect, useState } from "react";
import Context from "./Context";
import { post, setAuthorizationToken } from "../utils/fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const Provider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showNotificationsIndicator, setShowNotificationsIndicator] = useState(true);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await AsyncStorage.clear();
    setIsAuthenticated(false);
    setAuthorizationToken("");
    setToken("");
    setLoading(false);
    setShowNotificationsIndicator(true);
  };

  const decodeJWT = () => {
    if (!token) return;
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  };

  useEffect(() => {
    if (token) {
      const decodedToken = decodeJWT();
      const transformedToken = {
        ...decodedToken,
        first_name: decodedToken.firstName,
        last_name: decodedToken.lastName,
        username: decodedToken.userName,
      };

      delete transformedToken.firstName;
      delete transformedToken.lastName;
      delete transformedToken.userName;

      setUser(transformedToken);
    }
  }, [token]);

  const generateToken = async () => {
    const storedToken = await AsyncStorage.getItem("token");
    if (!storedToken) {
      setIsAuthenticated(false);
      return
    }
    setAuthorizationToken(storedToken);
    try {
      const response = await post("users/generate-new-token");
      setToken(response.data.token);
      setAuthorizationToken(response.data.token);
      await AsyncStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    generateToken();
  }, []);

  const auth = async (body) => {
    setLoading(true);
    try {
      const response = await post("users/login", body);
      await AsyncStorage.setItem("token", response.data.token);
      setToken(response.data.token);
      setIsAuthenticated(true);
      setAuthorizationToken(response.data.token);
    } catch {
      Alert.alert("Incorrect email or password", "Make sure you entered the right credentials", [{ text: "OK" }]);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (body) => {
    setLoading(true);
    try {
      const response = await post("users/signUp", body);
      setToken(response.data.token);
      setIsAuthenticated(true);
      setAuthorizationToken(response.data.token);
      AsyncStorage.setItem("token", response.data.token);
    } catch (error) {
      // if (error?.response?.data?.message) {
      //   Alert.alert("Error", error.response.data.message, [{ text: "OK" }]);
      // } else {
      //   Alert.alert("Error", "There seems to be a problem. Pease try again.", [{ text: "OK" }]);
      // }
      console.log(error.response.data)
    } finally {
      setLoading(false);
    }
  };

  return (
    <Context.Provider value={{ user, token, auth, signUp, logout, loading, setLoading, isAuthenticated, generateToken, showNotificationsIndicator, setShowNotificationsIndicator }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
