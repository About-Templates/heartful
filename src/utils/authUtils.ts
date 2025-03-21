
import { User } from "@/types/auth";
import { toast } from "@/hooks/use-toast";

export const LOCAL_STORAGE_USER_KEY = "hug-mind-self-user";

export const getStoredUser = (): User | null => {
  const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
  return storedUser ? JSON.parse(storedUser) : null;
};

export const storeUser = (user: User): void => {
  localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
};

export const removeUser = (): void => {
  localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  localStorage.removeItem("hug-mind-self-cohesion");
  localStorage.removeItem("hug-mind-self-tasks");
};

export const isValidAdmin = (email: string, password: string): boolean => {
  return email === "pizchy.wachida@gmail.com" && password === "Pizchy638601";
};

export const createMockUser = (email: string, name: string, isAdmin: boolean): User => {
  return {
    id: `user-${Date.now()}`,
    email,
    name: name || email.split('@')[0],
    createdAt: new Date().toISOString(),
    isAdmin
  };
};

export const showAuthToast = (
  type: "success" | "error",
  action: "login" | "signup" | "logout" | "reset" | "forgot" | "update"
): void => {
  const messages = {
    success: {
      login: { title: "เข้าสู่ระบบสำเร็จ", description: "ยินดีต้อนรับกลับมา! 🌟" },
      signup: { title: "สมัครสมาชิกสำเร็จ", description: "ยินดีต้อนรับสู่ Hug Mind Self! 🎉" },
      logout: { title: "ออกจากระบบสำเร็จ", description: "ขอบคุณที่ใช้บริการ กลับมาใหม่เร็วๆ นี้นะ! 👋" },
      reset: { title: "รีเซ็ตรหัสผ่านสำเร็จ", description: "คุณสามารถเข้าสู่ระบบด้วยรหัสผ่านใหม่ได้แล้ว" },
      forgot: { title: "ส่งอีเมลรีเซ็ตรหัสผ่านแล้ว", description: "โปรดตรวจสอบอีเมลของคุณเพื่อรีเซ็ตรหัสผ่าน" },
      update: { title: "อัปเดตโปรไฟล์สำเร็จ", description: "ข้อมูลของคุณได้รับการอัปเดตเรียบร้อยแล้ว" }
    },
    error: {
      login: { title: "เข้าสู่ระบบล้มเหลว", description: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
      signup: { title: "สมัครสมาชิกล้มเหลว", description: "เกิดข้อผิดพลาด โปรดลองอีกครั้ง" },
      reset: { title: "รีเซ็ตรหัสผ่านล้มเหลว", description: "เกิดข้อผิดพลาด โปรดลองอีกครั้ง" },
      forgot: { title: "ส่งอีเมลรีเซ็ตรหัสผ่านล้มเหลว", description: "เกิดข้อผิดพลาด โปรดลองอีกครั้ง" },
      update: { title: "อัปเดตโปรไฟล์ล้มเหลว", description: "เกิดข้อผิดพลาด โปรดลองอีกครั้ง" }
    }
  };

  const { title, description } = messages[type][action];
  
  toast({
    title,
    description,
    variant: type === "error" ? "destructive" : "default",
  });
};
