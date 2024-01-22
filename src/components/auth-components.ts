import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 420px;
  padding: 50px 0px;
`;

export const Title = styled.h1`
  font-size: 42px;
`;

export const Form = styled.form`
  margin-top: 50px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
export const Input = styled.input`
  padding: 10px 20px;
  border-radius: 10px;
  border: 1px solid gray;
  width: 100%;
  font-size: 16px;
  &[type="submit"] {
    cursor: pointer;
    background-color: indigo;
    color: white;
    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Error = styled.span`
  font-weight: 600px;
  color: tomato;
`;

export const Switcher = styled.span`
  margin-top: 20px;
  a {
    color: black;
  }
`;

export const SendEmailBtn = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: indigo;
  color: white;
  border: none;
  border-radius: 50px;
  cursor: pointer;
`;
