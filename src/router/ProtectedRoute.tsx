import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth";

export const ProtectedRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const result = await isAuthenticated();

      setSuccess(result);

      if (!result) {
        navigate("/auth", { replace: true });
      }

      setIsLoading(false);
    };
    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return <div>Авторизация...</div>;
  }

  if (success && !isLoading) {
    return <Outlet />;
  }

  return null;
};
