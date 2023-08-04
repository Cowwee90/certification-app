import { useState, useEffect, useCallback } from "react";

export default function useToken() {
  const getToken = useCallback(() => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken; //?.token;
  }, []);

  const [token, setToken] = useState(getToken());

  useEffect(() => {
    const updatedToken = getToken();
    setToken(updatedToken);
  }, [getToken]);

  useEffect(() => {}, [token]);

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };
}
