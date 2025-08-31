/* eslint-disable react-refresh/only-export-components */
import type {  SignupData } from "@/pages/signup";
import { createContext, useContext, useState, type ReactNode } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export interface UserType {
  _id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  profileImage: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  isVerified: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: UserType | null;
  login: (
    email: string,
    password: string
  ) => Promise<{ redirect: string } | void>; // Changed to Promise<void>
  register: (formData: SignupData) => Promise<{ redirect: string } | void>;
  token: null | string;
  logout: () => { redirect: string } | void;
  loading: boolean;
  isAdmin: boolean;
  error: null | string;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  token: null,
  login: async () => {}, // Changed to async function
  logout: () => {},
  register: async () => {}, // Already correct
  loading: false,
  isAdmin: false,
  error: null,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(() => {
    const storedUser = localStorage.getItem("user");
    console.log(storedUser);
    return storedUser ? (JSON.parse(storedUser) as UserType) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("accessToken");
    return storedToken ? JSON.parse(storedToken) : null;
  });

  const isAuthenticated = token ? true : false;
  const isAdmin = user?.role === "ADMIN" ? true : false;

  const login = async (
    email: string,
    password: string
  ): Promise<{ redirect: string } | void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("login failed, your email or password is wrong!!");
      }

      const data = await response.json();

      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("accessToken", JSON.stringify(data.token));
      setUser(data.data);
      setToken(data.token);

      const redirectPath =
        data.data.role === "ADMIN" ? "/dashboard/insights" : "/events";
      return { redirect: redirectPath };
    } catch (error) {
      setError((error as Error).message as string);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    formData: SignupData
  ): Promise<{ redirect: string } | void> => {
    try {
      setLoading(true);
      setError(null);
      console.log("form data type:", formData)
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Registration failed, please check your information!!");
      }

      const data = await response.json();

      console.log(data);
      localStorage.setItem("user", JSON.stringify(data.data));
      localStorage.setItem("accessToken", JSON.stringify(data.token)); //
      setUser(data.data);
      setToken(data.token);

      const redirectPath =
        data.data.role === "ADMIN" ? "/dashboard/insights" : "/events";
      return { redirect: redirectPath };
    } catch (error) {
      setError((error as Error).message as string);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setUser(null);
    return { redirect: "/login" };
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        error,
        isAdmin,
        token,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
