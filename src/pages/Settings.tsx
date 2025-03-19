
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Settings2, Bell, Moon, Languages, LogOut } from "lucide-react";

const Settings = () => {
  const { signOut } = useAuth();
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState("th");
  
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-6 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">การตั้งค่า</h1>
            <p className="text-gray-600">
              ปรับแต่งการใช้งานแอปพลิเคชันให้ตรงกับความต้องการของคุณ
            </p>
          </div>
          
          <div className="space-y-6">
            {/* Appearance settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Moon className="h-5 w-5 mr-2 text-theme-purple" />
                  การแสดงผล
                </CardTitle>
                <CardDescription>
                  ปรับแต่งรูปแบบการแสดงผลของแอปพลิเคชัน
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">โหมดกลางคืน</p>
                    <p className="text-sm text-gray-500">เปิดใช้งานธีมสีเข้ม</p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onCheckedChange={setDarkMode}
                    className="data-[state=checked]:bg-theme-purple"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Notifications settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-theme-purple" />
                  การแจ้งเตือน
                </CardTitle>
                <CardDescription>
                  จัดการการแจ้งเตือนและการติดต่อ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">การแจ้งเตือนในแอป</p>
                    <p className="text-sm text-gray-500">แสดงการแจ้งเตือนเมื่อใช้งานแอปพลิเคชัน</p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                    className="data-[state=checked]:bg-theme-purple"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">การแจ้งเตือนทางอีเมล</p>
                    <p className="text-sm text-gray-500">รับอีเมลเตือนเกี่ยวกับกิจกรรมและการอัพเดท</p>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    className="data-[state=checked]:bg-theme-purple"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Language settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Languages className="h-5 w-5 mr-2 text-theme-purple" />
                  ภาษา
                </CardTitle>
                <CardDescription>
                  เลือกภาษาที่ต้องการใช้งาน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="language">ภาษาที่ใช้แสดง</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="w-full">
                      <SelectValue placeholder="เลือกภาษา" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="th">ไทย</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            {/* Sign out */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-500">
                  <LogOut className="h-5 w-5 mr-2" />
                  ออกจากระบบ
                </CardTitle>
                <CardDescription>
                  ออกจากระบบและกลับไปยังหน้าเข้าสู่ระบบ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="destructive" 
                  className="w-full sm:w-auto"
                  onClick={handleSignOut}
                >
                  ออกจากระบบ
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
