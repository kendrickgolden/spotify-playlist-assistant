import LoginHook from './hooks/LoginHook';

export default function LogoutButton(props) {
    LoginHook(props.code);
    
  return (
    <button>
    <div id="sign-IO-btn">Logout</div>
  </button>
  )
}
