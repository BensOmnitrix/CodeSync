import { type JSX } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth-service";

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const navigate = useNavigate();
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  else{
    navigate("/dashboard", { replace: true });
  }
  return children;

};
