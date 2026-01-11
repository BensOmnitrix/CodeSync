import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";

export const ProtectedRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
