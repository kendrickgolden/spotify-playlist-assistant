import LoginHook from "./hooks/LoginHook";
import { Link } from "react-router-dom";

export default function LogoutButton(props) {
  LoginHook(props.code);

  function logout() {
    props.onClick(null);
  }

  return (
    <Link to="/">
        <div id="sign-IO-btn" onClick={logout}>Logout</div>
    </Link>
  );
}
