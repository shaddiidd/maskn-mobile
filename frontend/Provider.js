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
    await AsyncStorage.clear();
    setIsAuthenticated(false);
    setToken("");
    setUser({});
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

  // useEffect(() => {
  //   setAuthorizationToken(token);
  //   if (token !== "") {
  //     setLoading(true);
  //     get("user")
  //       .then((response) => {
  //         setLoading(false);
  //         setUser(response);
  //         setIsAuthenticated(true);
  //       })
  //       .catch(() => {
  //         logout();
  //       });
  //   } else {
  //     setIsAuthenticated(false);
  //   }
  // }, [token]);

  const auth = (body) => {
    setLoading(true);
    post("users/login", body)
      .then((response) => {
        setToken(response.data.token);
        setUser(response.data);
        setIsAuthenticated(true);
        setAuthorizationToken(response.data.token);
        AsyncStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  signUp = (body) => {
    setLoading(true);
    post("users/signUp", body)
      .then((response) => {
        console.log(response)
        setToken(response.user.token);
        setUser(response.user.data.newUser);
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
