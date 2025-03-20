
export type User = {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  isAdmin?: boolean;
};

export type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updateProfile: (data: { name?: string, email?: string }) => Promise<void>;
  isAdmin: boolean;
};
