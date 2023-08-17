"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

const fetcher = (...args: any) => fetch(...args).then((res) => res.json());
const Profiledetaiuls = ({ params }: any) => {
  const [user, setUser] = useState("");
  const userId = params.pid;

  const { data, error, isLoading } = useSWR("/api/user/token", fetcher);

  return (
    <React.Fragment>
      {isLoading ? (
        <p>Loading....</p>
      ) : (
        <>
          <h1>UsersName : {data?.user.username}</h1>
          {error && <p>{error}</p>}
        </>
      )}
    </React.Fragment>
  );
};

export default Profiledetaiuls;
