
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
import { useTheme } from "@/providers/ThemeProvider";
import { useIsMobile } from "@/hooks/use-mobile";

const Settings = () => {
  const { signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState("th");
  const isMobile = useIsMobile();
  
  const handleSignOut = async () => {
    await signOut();
  };

  const toggleDarkMode = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6 md:py-8 px-4 md:px-6 bg-background">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold gradient-text mb-2">การตั้งค่า</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              ปรับแต่งการใช้งานแอปพลิเคชันให้ตรงกับความต้องการของคุณ
            </p>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            {/* Appearance settings */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <Moon className="h-4 w-4 md:h-5 md:w-5 mr-2 text-theme-purple" />
                  การแสดงผล
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  ปรับแต่งรูปแบบการแสดงผลของแอปพลิเคชัน
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm md:text-base">โหมดกลางคืน</p>
                    <p className="text-xs md:text-sm text-muted-foreground">เปิดใช้งานธีมสีเข้ม</p>
                  </div>
                  <Switch
                    checked={theme === "dark"}
                    onCheckedChange={toggleDarkMode}
                    className="data-[state=checked]:bg-theme-purple"
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Notifications settings */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <Bell className="h-4 w-4 md:h-5 md:w-5 mr-2 text-theme-purple" />
                  การแจ้งเตือน
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  จัดการการแจ้งเตือนและการติดต่อ
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm md:text-base">การแจ้งเตือนในแอป</p>
                    <p className="text-xs md:text-sm text-muted-foreground">แสดงการแจ้งเตือนเมื่อใช้งานแอปพลิเคชัน</p>
                  </div>
                  <Switch
                    checked={notifications}
                    onCheckedChange={setNotifications}
                    className="data-[state=checked]:bg-theme-purple"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm md:text-base">การแจ้งเตือนทางอีเมล</p>
                    <p className="text-xs md:text-sm text-muted-foreground">รับอีเมลเตือนเกี่ยวกับกิจกรรมและการอัพเดท</p>
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
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg md:text-xl">
                  <Languages className="h-4 w-4 md:h-5 md:w-5 mr-2 text-theme-purple" />
                  ภาษา
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  เลือกภาษาที่ต้องการใช้งาน
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-sm md:text-base">ภาษาที่ใช้แสดง</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language" className="w-full text-sm md:text-base">
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
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg md:text-xl text-red-500">
                  <LogOut className="h-4 w-4 md:h-5 md:w-5 mr-2" />
                  ออกจากระบบ
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  ออกจากระบบและกลับไปยังหน้าเข้าสู่ระบบ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  variant="destructive" 
                  className="w-full sm:w-auto text-sm md:text-base"
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
