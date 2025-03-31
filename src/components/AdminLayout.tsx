
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  Users, 
  Activity, 
  Settings,
  Home, 
  LogOut, 
  Shield,
  Menu,
  X
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const adminMenuItems = [
    { name: "ผู้ใช้ระบบ", icon: Users, path: "/admin/users" },
    { name: "กิจกรรมผู้ใช้", icon: Activity, path: "/admin/activity" },
    { name: "ตั้งค่า", icon: Settings, path: "/admin/settings" },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 flex-col bg-slate-800 text-white">
          <div className="p-4 border-b border-slate-700">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-yellow-400" />
              <h1 className="text-xl font-semibold">ระบบแอดมิน</h1>
            </div>
          </div>
          <div className="flex flex-col justify-between flex-1 overflow-y-auto">
            <nav className="p-4 space-y-2">
              {adminMenuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-full justify-start text-left hover:bg-slate-700 text-white ${
                    isActive(item.path)
                      ? "bg-slate-700"
                      : ""
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
              
              <div className="pt-4 mt-4 border-t border-slate-700">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left hover:bg-slate-700 text-white"
                  onClick={() => navigate("/dashboard")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  กลับสู่หน้าหลัก
                </Button>
              </div>
            </nav>
            <div className="p-4 border-t border-slate-700 flex flex-col space-y-2">
              <div className="flex justify-center mb-2">
                <ThemeToggle />
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-left hover:bg-slate-700 text-white"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-slate-800 text-white z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-yellow-400" />
              <h1 className="text-xl font-semibold">ระบบแอดมิน</h1>
            </div>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white" onClick={() => setMobileMenuOpen(true)}>
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </div>
          </div>
        </div>

        {/* Mobile sidebar with Sheet */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="bg-slate-800 text-white p-0 w-64">
            <div className="p-4 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-yellow-400" />
                  <h1 className="text-xl font-semibold">ระบบแอดมิน</h1>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="flex flex-col justify-between flex-1 overflow-y-auto">
              <nav className="p-4 space-y-2">
                {adminMenuItems.map((item, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className={`w-full justify-start text-left hover:bg-slate-700 text-white ${
                      isActive(item.path)
                        ? "bg-slate-700"
                        : ""
                    }`}
                    onClick={() => {
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.name}
                  </Button>
                ))}
                
                <div className="pt-4 mt-4 border-t border-slate-700">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left hover:bg-slate-700 text-white"
                    onClick={() => {
                      navigate("/dashboard");
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    กลับสู่หน้าหลัก
                  </Button>
                </div>
              </nav>
              <div className="p-4 border-t border-slate-700">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-left hover:bg-slate-700 text-white"
                  onClick={signOut}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  ออกจากระบบ
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 pt-16 md:pt-6 pb-20 md:pb-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{title || location.pathname.split('/').pop()?.replace(/^\w/, c => c.toUpperCase())}</h1>
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
                className="hidden md:flex"
              >
                <Home className="mr-2 h-4 w-4" />
                กลับสู่หน้าหลัก
              </Button>
            </div>
            {children}
          </div>
        </div>
        
        {/* Bottom mobile navigation for admin */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-800 border-t border-slate-700 z-40">
          <div className="flex justify-around items-center h-16">
            {adminMenuItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center justify-center h-full px-1 rounded-none text-white ${
                  isActive(item.path)
                    ? "bg-slate-700"
                    : ""
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs">{item.name}</span>
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center justify-center h-full px-1 rounded-none text-white"
              onClick={() => navigate('/dashboard')}
            >
              <Home className="h-5 w-5 mb-1" />
              <span className="text-xs">หน้าหลัก</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
