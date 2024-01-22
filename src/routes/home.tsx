import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import Layout from "../components/layout";
import styled from "styled-components";

const Wrapper = styled.div``;

export default function Home() {
  const navigate = useNavigate();
  const onClick = () => {
    auth.signOut();
    navigate("/login");
  };
  return (
    <Wrapper>
      <Layout />
      <h1>
        <button onClick={onClick}>Log out</button>
      </h1>
    </Wrapper>
  );
}
