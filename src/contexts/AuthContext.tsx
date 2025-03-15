
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, name: string, password: string) => Promise<void>;
  signOut: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored user in localStorage
    const storedUser = localStorage.getItem("hug-mind-self-user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in a real app, you would validate with a backend
      if (email && password) {
        const mockUser = {
          id: `user-${Date.now()}`,
          email,
          name: email.split('@')[0]
        };
        
        // Store user in localStorage
        localStorage.setItem("hug-mind-self-user", JSON.stringify(mockUser));
        setUser(mockUser);
        
        toast({
          title: "เข้าสู่ระบบสำเร็จ",
          description: "ยินดีต้อนรับกลับมา! 🌟",
        });
        
        navigate("/dashboard");
      } else {
        throw new Error("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
      }
    } catch (error) {
      toast({
        title: "เข้าสู่ระบบล้มเหลว",
        description: error instanceof Error ? error.message : "เกิดข้อผิดพลาด โปรดลองอีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, name: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - in a real app, you would register with a backend
      if (email && name && password) {
        const mockUser = {
          id: `user-${Date.now()}`,
          email,
          name
        };
        
        // Store user in localStorage
        localStorage.setItem("hug-mind-self-user", JSON.stringify(mockUser));
        setUser(mockUser);
        
        toast({
          title: "สมัครสมาชิกสำเร็จ",
          description: "ยินดีต้อนรับสู่ Hug Mind Self! 🎉",
        });
        
        navigate("/dashboard");
      } else {
        throw new Error("กรุณากรอกข้อมูลให้ครบถ้วน");
      }
    } catch (error) {
      toast({
        title: "สมัครสมาชิกล้มเหลว",
        description: error instanceof Error ? error.message : "เกิดข้อผิดพลาด โปรดลองอีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("hug-mind-self-user");
    localStorage.removeItem("hug-mind-self-cohesion");
    localStorage.removeItem("hug-mind-self-tasks");
    setUser(null);
    navigate("/");
    toast({
      title: "ออกจากระบบสำเร็จ",
      description: "ขอบคุณที่ใช้บริการ กลับมาใหม่เร็วๆ นี้นะ! 👋",
    });
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulating API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "ส่งอีเมลรีเซ็ตรหัสผ่านแล้ว",
        description: "โปรดตรวจสอบอีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน",
      });
      
      navigate("/");
    } catch (error) {
      toast({
        title: "ส่งอีเมลรีเซ็ตรหัสผ่านล้มเหลว",
        description: error instanceof Error ? error.message : "เกิดข้อผิดพลาด โปรดลองอีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (token: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "รีเซ็ตรหัสผ่านสำเร็จ",
        description: "คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้แล้ว",
      });
      
      navigate("/login");
    } catch (error) {
      toast({
        title: "รีเซ็ตรหัสผ่านล้มเหลว",
        description: error instanceof Error ? error.message : "เกิดข้อผิดพลาด โปรดลองอีกครั้ง",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
