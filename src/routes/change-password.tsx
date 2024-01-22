import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { FirebaseError } from "firebase/app";
import {
  Error,
  Form,
  Input,
  Switcher,
  Title,
  Wrapper,
} from "../components/auth-components";

export default function ChangePassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (email === null || isLoading) return;
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      alert("이메일을 보냈습니다.");
      navigate("/login");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <Title>Change Password</Title>
      <Form onSubmit={onSubmit}>
        <Input
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          placeholder="Email"
        />
        <Input
          type="submit"
          value={isLoading ? "Loading..." : "이메일 보내기"}
        />
      </Form>
      <Switcher>
        <Link to={"/login"}>Back to Login</Link>
      </Switcher>
      {error !== "" ? <Error>{error}</Error> : null}
    </Wrapper>
  );
}
