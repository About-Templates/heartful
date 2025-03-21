
import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types/auth";
import { getStoredUser } from "@/utils/authUtils";
import { useAuthActions } from "@/hooks/useAuthActions";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updateProfile: (data: { name?: string, email?: string }) => Promise<void>;
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
  
  const {
    isLoading: authActionsLoading,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
    updateProfile
  } = useAuthActions(setUser);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setIsLoading(false);
  }, []);

  const isAdmin = user?.isAdmin || false;

  // Combine loading states
  const combinedIsLoading = isLoading || authActionsLoading;

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      isLoading: combinedIsLoading, 
      isAdmin,
      signIn,
      signUp,
      signOut,
      forgotPassword,
      resetPassword,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};
