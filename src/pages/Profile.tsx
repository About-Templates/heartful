
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Mail, Shield, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const { user, updateProfile, isLoading } = useAuth();
  
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    try {
      await updateProfile({ name });
      setSuccess("ข้อมูลโปรไฟล์ถูกอัพเดทเรียบร้อยแล้ว");
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการอัพเดทข้อมูล โปรดลองอีกครั้ง");
      console.error(err);
    }
  };
  
  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    if (newPassword !== confirmPassword) {
      setError("รหัสผ่านใหม่ไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง");
      return;
    }
    
    if (newPassword.length < 6) {
      setError("รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร");
      return;
    }
    
    try {
      // We would call a password update function here
      // await updatePassword(currentPassword, newPassword);
      setSuccess("รหัสผ่านถูกเปลี่ยนเรียบร้อยแล้ว");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการเปลี่ยนรหัสผ่าน โปรดลองอีกครั้ง");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-6 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">โปรไฟล์ของฉัน</h1>
            <p className="text-gray-600">
              จัดการข้อมูลบัญชีและการตั้งค่าความปลอดภัยของคุณ
            </p>
          </div>
          
          {/* Profile header */}
          <div className="bg-white rounded-xl p-6 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="" />
              <AvatarFallback className="bg-theme-purple text-3xl text-white">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-2xl font-bold">{user?.name}</h2>
              <p className="text-gray-500">{user?.email}</p>
              <p className="text-sm text-gray-400 mt-1">
                เข้าร่วมเมื่อ {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('th-TH') : "ไม่ระบุ"}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Update profile card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-theme-purple" />
                  แก้ไขข้อมูลส่วนตัว
                </CardTitle>
                <CardDescription>
                  อัพเดทข้อมูลส่วนตัวของคุณ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">ชื่อ</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">อีเมล</Label>
                    <Input 
                      id="email" 
                      value={email} 
                      disabled 
                      className="bg-gray-50" 
                    />
                    <p className="text-xs text-gray-500">
                      ไม่สามารถเปลี่ยนอีเมลได้
                    </p>
                  </div>
                  
                  {success && <p className="text-green-600 text-sm">{success}</p>}
                  {error && <p className="text-red-600 text-sm">{error}</p>}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-theme-purple hover:bg-theme-purple-dark"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        กำลังอัพเดท...
                      </>
                    ) : (
                      "บันทึกข้อมูล"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Change password card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-theme-purple" />
                  เปลี่ยนรหัสผ่าน
                </CardTitle>
                <CardDescription>
                  อัพเดทรหัสผ่านของคุณเพื่อความปลอดภัย
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">รหัสผ่านปัจจุบัน</Label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      value={currentPassword} 
                      onChange={(e) => setCurrentPassword(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="new-password">รหัสผ่านใหม่</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      value={newPassword} 
                      onChange={(e) => setNewPassword(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">ยืนยันรหัสผ่านใหม่</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  {/* Error message would show here */}
                  
                  <Button 
                    type="submit" 
                    variant="outline"
                    className="w-full"
                    disabled={isLoading}
                  >
                    เปลี่ยนรหัสผ่าน
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
