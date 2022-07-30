import React from "react";

export default function LoginButton() {
  function LoginHandler() {
    const fetchPromise = fetch("http://localhost:5000/login", {
      method: "GET",
    });

    fetchPromise
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => console.log(data));
  }

  return (
    <button onClick={LoginHandler}>
      <div id="sign-in-btn">Login</div>
    </button>
  );
}
