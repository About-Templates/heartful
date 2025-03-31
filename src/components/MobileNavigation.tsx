
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Calendar, 
  CheckSquare, 
  User, 
  BarChart2,
  Shield,
} from "lucide-react";

const MobileNavigation = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  if (!user) return null;

  const menuItems = [
    { name: "หน้าหลัก", icon: Home, path: "/dashboard" },
    { name: "ความสำเร็จ", icon: Calendar, path: "/cohesion" },
    { name: "งาน", icon: CheckSquare, path: "/tasks" },
    { name: "โปรไฟล์", icon: User, path: "/profile" },
    { name: "สถิติ", icon: BarChart2, path: "/stats" },
  ];

  // Add admin link if user is admin
  if (isAdmin) {
    menuItems.push({ name: "แอดมิน", icon: Shield, path: "/admin/users" });
  }
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-40">
      <div className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            size="sm"
            className={`flex flex-col items-center justify-center h-full px-1 rounded-none ${
              isActive(item.path)
                ? "text-theme-purple bg-accent/50"
                : "text-muted-foreground"
            }`}
            onClick={() => navigate(item.path)}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs">{item.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default MobileNavigation;
