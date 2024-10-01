import React, { useEffect, useState, useContext } from "react";
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Context from "./Context";
// import { get, post, setAuthorizationToken } from "./fetch";

const Provider = ({ children }) => {
  // const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);


  const logout = async () => {
    setIsAuthenticated(false);
    setUser({});
  };

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     const storedToken = await AsyncStorage.getItem("token");
  //     if (storedToken) {
  //       setToken(storedToken);
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   };
  //   fetchToken();
  // }, []);

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

  const auth = () => {
    setIsAuthenticated(true);
    setUser({
      name: "Hazem Odeh",
      profile_pictire: require("./assets/hazodeh.png"),
      type: "renter",
    });
  };

  return (
    <Context.Provider value={{ user, auth, logout, loading, setLoading, isAuthenticated }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
