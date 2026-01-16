import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth-service";

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
