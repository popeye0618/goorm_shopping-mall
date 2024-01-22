import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

export default function Home() {
  const navigate = useNavigate();
  const onClick = () => {
    auth.signOut();
    navigate("/");
  };
  return (
    <h1>
      <button onClick={onClick}>Log out</button>
    </h1>
  );
}
