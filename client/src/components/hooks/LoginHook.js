import { useEffect } from "react";

export default function LoginHook(code) {
    window.history.pushState({}, null, "/");
  useEffect(() => {
    fetch(`http://localhost:5000/callback/?code=${code}`, {
      method: "GET",
    });
  }, [code]);
}
