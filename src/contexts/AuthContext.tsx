
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/auth";
import { getStoredUser } from "@/utils/authUtils";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const isAdmin = user?.isAdmin || false;

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
