
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Calendar, 
  CheckSquare, 
  User, 
  BarChart2, 
  Settings,
  LogOut,
  Shield
} from "lucide-react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { signOut, isAdmin } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { name: "แดชบอร์ด", icon: Home, path: "/dashboard" },
    { name: "ความสำเร็จ", icon: Calendar, path: "/cohesion" },
    { name: "งาน", icon: CheckSquare, path: "/tasks" },
    { name: "โปรไฟล์", icon: User, path: "/profile" },
    { name: "สถิติ", icon: BarChart2, path: "/stats" },
    { name: "ตั้งค่า", icon: Settings, path: "/settings" },
  ];

  // Add admin link if user is admin
  if (isAdmin) {
    menuItems.push({ name: "แอดมิน", icon: Shield, path: "/admin" });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 flex-col bg-white border-r shadow-sm">
          <div className="p-4 border-b">
            <h1 className="text-xl font-semibold text-theme-purple">Hug Mind Self</h1>
          </div>
          <div className="flex flex-col justify-between flex-1 overflow-y-auto">
            <nav className="p-4 space-y-2">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-full justify-start text-left ${
                    window.location.pathname === item.path
                      ? "bg-gray-100"
                      : ""
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </nav>
            <div className="p-4 border-t">
              <Button
                variant="ghost"
                className="w-full justify-start text-left"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile header */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-xl font-semibold text-theme-purple">Hug Mind Self</h1>
            {/* Mobile menu button (implement dropdown if needed) */}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="md:p-6 p-4 pt-16 md:pt-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
