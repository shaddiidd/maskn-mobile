import React, { useEffect, useState, useContext } from "react";
import Context from "./Context";
import { get, post, setAuthorizationToken } from "./fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setAuthorizationToken(storedToken);
      } else {
        setIsAuthenticated(false);
      }
    };
    fetchToken();
  }, []);

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
      setLoading(true);
      const decodedToken = decodeJWT();
      console.log(decodedToken);
      setUser({...decodedToken, role: 2});
      setLoading(false);
    }
    
  }, [token]);

  const auth = (body) => {
    setLoading(true);
    post("users/login", body)
      .then((response) => {
        setToken(response.data.token);
        setIsAuthenticated(true);
        setAuthorizationToken(response.data.token);
        AsyncStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const signUp = (body) => {
    setLoading(true);
    post("users/signUp", body)
      .then((response) => {
        console.log(response)
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
    <Context.Provider value={{ user, token, auth, signUp, logout, loading, setLoading, isAuthenticated }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
