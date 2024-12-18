import React, { useEffect, useState } from "react";
import Context from "./Context";
import { post, setAuthorizationToken } from "./fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

const Provider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    await AsyncStorage.clear();
    setIsAuthenticated(false);
    setToken("");
    setLoading(false);
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
      setUser(decodedToken);
      console.log(decodedToken)
    }
  }, [token]);

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setAuthorizationToken(storedToken);
        post("users/generate-new-token")
          .then((response) => {
            console.log(response)
            setToken(response.data.data);
            setAuthorizationToken(response.data.data);
            AsyncStorage.setItem("token", response.data.data);
            setIsAuthenticated(true);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setIsAuthenticated(false);
      }
    };
    fetchToken();
  }, []);

  const auth = async (body) => {
    setLoading(true);
    try {
      const response = await post("users/login", body);
      // await AsyncStorage.setItem("token", response.data.token);
      setToken(response.data);
      setIsAuthenticated(true);
      setAuthorizationToken(response.data);
    } catch {
      Alert.alert("Incorrect email or password", "Make sure you entered the right credentials", [{ text: "OK" }]);
      logout();
    }
    setLoading(false);
  };

  const signUp = (body) => {
    setLoading(true);
    post("users/signUp", body)
      .then((response) => {
        setToken(response.user.data.token);
        setIsAuthenticated(true);
        setAuthorizationToken(response.user.token);
        AsyncStorage.setItem("token", response.user.token);
      })
      .catch((error) => {
        console.log("error:", error.response.data);
      })
      .finally(() => setLoading(false));
  };

  return (
    <Context.Provider
      value={{
        user,
        token,
        auth,
        signUp,
        logout,
        loading,
        setLoading,
        isAuthenticated,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Provider;
