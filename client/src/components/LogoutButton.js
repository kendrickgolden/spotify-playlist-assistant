import LoginHook from './hooks/LoginHook';

export default function LogoutButton(props) {
    LoginHook(props.code);
    function logout() {
      props.onClick(null);
    }

  return (
    <button onClick={logout}>
    <div id="sign-IO-btn">Logout</div>
  </button>
  )
}
