"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const VerifyPage = () => {
  const [token, setToken] = useState("");
  const [verify, setVerify] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/user/verifyemail", { token });
      setVerify(true);
    } catch (err: any) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token?.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div>
      <p>Token : {token ? token : "No Token"}</p>
      {verify && (
        <div>
          <h3>Email is verified</h3>
          <Link href="/login">Back To LogIn</Link>
        </div>
      )}
    </div>
  );
};

export default VerifyPage;
