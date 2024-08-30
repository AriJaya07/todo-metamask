"use client";

import axios from "axios";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface AuthContextType {
  address: string | null;
  isAuthenticated: boolean;
  login: (address: string, signature: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const localData = localStorage.getItem("user");
    if (localData) {
      const parseData = JSON.parse(localData);
      setAddress(parseData.user.address);
      setIsAuthenticated(true);
    }
  }, [isAuthenticated, address]);

  const login = async (address: string, signature: string) => {
    try {
      const response = await axios.post("/api/auth", { address, signature });

      if (response.status === 200) {
        setAddress(address);
        setIsAuthenticated(true);

        const user = JSON.stringify(response.data);
        localStorage.setItem("user", user);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error during Axios request:", error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    setAddress(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ address, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
