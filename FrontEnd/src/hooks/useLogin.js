import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (name, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("https://meet-up-server.vercel.app/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });
    const json = await response.json();
    if (!json.success) {
      setIsLoading(false);
      setError(json.error);
    }
    if (json.success) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({type : "LOGIN", payload : json});
      setIsLoading(false);
    }
  };
  return { login,error,isLoading };
};
