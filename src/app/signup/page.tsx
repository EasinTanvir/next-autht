"use client";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SendData } from "@/Types/Types";
import { toast } from "react-hot-toast";

function signup() {
  const router = useRouter();
  const [inputs, setInputs] = useState<SendData>({
    username: "",
    email: "",
    password: "",
  });
  const [btn, setBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");

  const onChangehandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const onSubmitHanlder = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const sendData: SendData = {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password,
    };
    try {
      setLoading(true);
      const { data } = await axios.post("/api/user/signup", sendData);
      setLoading(false);
      console.log(data);
      toast.success("Successfully toasted!");
      router.push("/login");
    } catch (err: any) {
      seterror(err.response.data.message);
      console.log(err);
      toast.error("This didn't work.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      inputs.username.length > 0 &&
      inputs.email.length > 0 &&
      inputs.password.length > 0
    ) {
      setBtn(false);
    } else {
      setBtn(true);
    }
  }, [inputs]);

  return (
    <Form
      onSubmit={onSubmitHanlder}
      className="w-50 m-auto mt-5 border border-primary p-4"
    >
      <h3 className="text-center my-2">SignUp here</h3>
      <Form.Group className="mb-3">
        <Form.Label>userName</Form.Label>
        <Form.Control
          name="username"
          onChange={onChangehandler}
          type="text"
          placeholder="Enter userName"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          onChange={onChangehandler}
          type="email"
          placeholder="Enter email"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          onChange={onChangehandler}
          type="password"
          placeholder="Password"
        />
      </Form.Group>
      <Button disabled={btn || loading} variant="primary" type="submit">
        {loading ? "Loading..." : "Submit"}
      </Button>
      {error && (
        <div className="mt-2">
          <p className="bg-danger">{error}</p>
        </div>
      )}
      <div className="mt-2">
        <Link className="btn" style={{ textDecoration: "none" }} href="/login">
          Go to LogIn
        </Link>
      </div>
    </Form>
  );
}

export default signup;
