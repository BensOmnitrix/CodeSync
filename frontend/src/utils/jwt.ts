import { getToken } from "../services/auth-service";

export interface DecodedToken {
  id: string;
  email: string;
  username: string;
  iat?: number;
  exp?: number;
}

export const decodeToken = (token: string): DecodedToken | null => {
  try {
    const parts = token.replace("Bearer ", "").split(".");
    if (parts.length !== 3) {
      return null;
    }

    const decoded = JSON.parse(
      atob(parts[1])
    ) as DecodedToken;

    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

export const getCurrentUser = (): DecodedToken | null => {
  const token = getToken();

  if (!token) {
    return null;
  }

  return decodeToken(token);
};
