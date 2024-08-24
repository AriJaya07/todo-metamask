"use client"

import React, { createContext, useContext, ReactNode, useState } from 'react';
import axios from 'axios';

interface AuthContextType {
  address: string | null;
  isAuthenticated: boolean;
  login: (address: string, signature: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const login = async (address: string, signature: string) => {
    try {
      const response = await axios.post('/api/auth', { address, signature });

      console.log(response, "PPP")
      if (response.status === 200) {
        setAddress(address);
        setIsAuthenticated(true);
        
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error during Axios request:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    setAddress(null);
    setIsAuthenticated(false);
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
