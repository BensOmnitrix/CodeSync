import axios from "axios";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    username: string;
  };
}

export const login = async (payload: LoginPayload) : Promise<AuthResponse | undefined>=> {
  try {
    const response = await axios.post<AuthResponse>("http://localhost:8080/api/auth/login", {
      data: {
        email: payload.email,
        password: payload.password,
      },
    });
    if(!response.data.token){
      throw new Error("No token received");
    }
    setToken("Bearer " + response.data.token);
    return response.data;
  } catch (err) {
    console.error("Login failed", err);
  }
};

export const register = async (payload: RegisterPayload) : Promise<AuthResponse | undefined> => {
  try {
    const response = await axios.post<AuthResponse>("http://localhost:8080/api/auth/register", {
      data: {
        email: payload.email,
        username: payload.username,
        password: payload.password,
      },
    });
    if(!response.data.token){
        throw new Error("No token received");
    }
    setToken("Bearer " + response.data.token);
    return response.data;
  } catch (err) {
    console.error("Login failed", err);
  }
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
}

export const getToken = () => {
  return localStorage.getItem("token");
}

export const logout = () => {
  localStorage.removeItem("token");
}