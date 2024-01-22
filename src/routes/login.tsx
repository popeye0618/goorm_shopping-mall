import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  Title,
  Wrapper,
  Form,
  Switcher,
  Error,
} from "../components/auth-components";
import React, { useState } from "react";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  return (
    <Wrapper>
      <Title>로그인</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name="email"
          value={email}
          placeholder="Email"
          type="email"
          required
        />
        <Input
          onChange={onChange}
          name="password"
          value={password}
          placeholder="Password"
          type="password"
          required
        />
        <Input type="submit" value={isLoading ? "Loading..." : "Login"} />
      </Form>
      {error !== "" ? <Error>{error}</Error> : null}
      <Switcher>
        Don't have an account?{" "}
        <Link to="/create-account">계정 만들기 &rarr;</Link>
      </Switcher>
      <Switcher>
        <Link to="/change-password">Forgot Password?</Link>
      </Switcher>
    </Wrapper>
  );
}
