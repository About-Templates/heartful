import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/types/auth";
import { 
  storeUser, 
  removeUser, 
  isValidAdmin, 
  createMockUser, 
  showAuthToast 
} from "@/utils/authUtils";

export const useAuthActions = (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const signIn = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulating API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if credentials are for admin
      const isAdminCredentials = isValidAdmin(email, password);
      
      if (email && password) {
        // Only set isAdmin to true if the specific admin credentials are used
        const isAdmin = isAdminCredentials;
        
        // If admin email but wrong password, reject login
        if (email === "pizchy.wachida@gmail.com" && !isAdminCredentials) {
          throw new Error("รหัสผ่านไม่ถูกต้อง");
        }
        
        const mockUser = createMockUser(email, email.split('@')[0], isAdmin);
        
        // Store user in localStorage
        storeUser(mockUser);
        setUser(mockUser);
        
        showAuthToast("success", "login");
        
        navigate(isAdmin ? "/admin/users" : "/dashboard");
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
        const mockUser = createMockUser(email, name, false);
        
        // Store user in localStorage
        storeUser(mockUser);
        setUser(mockUser);
        
        showAuthToast("success", "signup");
        
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
    removeUser();
    setUser(null);
    navigate("/");
    showAuthToast("success", "logout");
  };

  const forgotPassword = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulating API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showAuthToast("success", "forgot");
      
      navigate("/");
    } catch (error) {
      toast({
        title: "ส่งอีเมลรีเซ็ตรหัสผ่านล้มเหลว",
        description: error instanceof Error ? error.message : "เกิดข้อผิดพล���ด โปรดลองอีกครั้ง",
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
      
      showAuthToast("success", "reset");
      
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

  const updateProfile = async (data: { name?: string; email?: string }) => {
    setIsLoading(true);
    try {
      // Simulating API call with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(currentUser => {
        if (currentUser) {
          const updatedUser = { ...currentUser, ...data };
          storeUser(updatedUser);
          return updatedUser;
        }
        return currentUser;
      });
      
      showAuthToast("success", "update");
    } catch (error) {
      toast({
        title: "อัปเดตโปรไฟล์ล้มเหลว",
        description: error instanceof Error ? error.message : "เกิดข้อผิดพลาด โปรดลองอีกครั้ง",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    signIn,
    signUp,
    signOut,
    forgotPassword,
    resetPassword,
    updateProfile
  };
};
