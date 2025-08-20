/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, type ReactNode } from "react";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

const AuthContext = createContext({
  isAuthenticated: false,
  user: {},
  login: () => {},
  logout: () => {},
  register: () => {},
  isLoading: false,
  isAdmin: false,
  error: null,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(false);
  const isAuthenticated = false;
  //"user.role === ADMIN";
  const isAdmin = false;
  const [error, setError] = useState<string | null>(null);

  const login = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email:"", password:"" }),
      });
      if (!response.ok) {
        throw new Error("login failed, your email or password is wrong!!");
      }

      const data = await response.json();

      console.log(data);
      // redirect user
      // setUser info user in localstorage
      setUser({});
      console.log(error);
      return data;
    } catch (error) {
      setError((error as Error).message as string);
    } finally {
      setLoading(false);
    }
  };
  const register = async () => {};
  const logout = async () => {};

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        isLoading,
        error: null,
        isAdmin,
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
