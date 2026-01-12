import { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../services/auth-service";

export const PublicRoute = ({
  children,
}: {
  children: JSX.Element;
}): JSX.Element => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};
