
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Activity, 
  Settings,
  Home, 
  LogOut, 
  Shield 
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const adminMenuItems = [
    { name: "ผู้ใช้ระบบ", icon: Users, path: "/admin/users" },
    { name: "กิจกรรมผู้ใช้", icon: Activity, path: "/admin/activity" },
    { name: "ตั้งค่า", icon: Settings, path: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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
                  className={`w-full justify-start text-left hover:bg-slate-700 ${
                    window.location.pathname === item.path
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
                  className="w-full justify-start text-left hover:bg-slate-700"
                  onClick={() => navigate("/dashboard")}
                >
                  <Home className="mr-2 h-4 w-4" />
                  กลับสู่หน้าหลัก
                </Button>
              </div>
            </nav>
            <div className="p-4 border-t border-slate-700">
              <Button
                variant="ghost"
                className="w-full justify-start text-left hover:bg-slate-700"
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
            {/* Mobile menu button (implement if needed) */}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-6 pt-16 md:pt-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{title}</h1>
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
      </div>
    </div>
  );
};

export default AdminLayout;
