import LoginHook from "./hooks/LoginHook";
import { Link } from "react-router-dom";

export default function LogoutButton({ code, onClick, id }) {
  LoginHook(code);

  function logout() {
    onClick(null);
  }

  return (
    <div className="login-btn" id={id} onClick={logout}>
      <Link to="/">SIGN OUT</Link>
    </div>
  );
}
