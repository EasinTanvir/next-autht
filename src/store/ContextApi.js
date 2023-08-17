"use client";
import React, { useContext, useState, useEffect } from "react";

const ContextApi = React.createContext();

export const ContextApiWrapper = ({ children }) => {
  let recData;
  if (typeof window !== "undefined") {
    recData = localStorage.getItem("auth")
      ? JSON.parse(localStorage.getItem("auth"))
      : "";
  }
  const [authData, setAuthData] = useState(recData);

  //   useEffect(() => {

  //     console.log(recData);
  //     setAuthData(recData);
  //   }, []);

  return (
    <ContextApi.Provider value={{ authData }}>{children}</ContextApi.Provider>
  );
};

export const UseContextApi = () => useContext(ContextApi);
