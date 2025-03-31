
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";
import { 
  Home, 
  Calendar, 
  CheckSquare, 
  User, 
  BarChart2, 
  Settings,
  LogOut,
  Shield,
  Menu,
  X
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { signOut, isAdmin } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);

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
    menuItems.push({ name: "แอดมิน", icon: Shield, path: "/admin/users" });
  }

  const handleNavigation = (path: string) => {
    navigate(path);
    if (isMobile) {
      setOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden md:flex md:w-64 flex-col bg-sidebar border-r border-sidebar-border shadow-sm">
          <div className="p-4 border-b border-sidebar-border">
            <h1 className="text-xl font-semibold text-theme-purple">Hug Mind Self</h1>
          </div>
          <div className="flex flex-col justify-between flex-1 overflow-y-auto">
            <nav className="p-4 space-y-2">
              {menuItems.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`w-full justify-start text-left text-sm text-sidebar-foreground ${
                    window.location.pathname === item.path
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : ""
                  }`}
                  onClick={() => handleNavigation(item.path)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              ))}
            </nav>
            <div className="p-4 border-t border-sidebar-border flex flex-col space-y-2">
              <div className="flex justify-center mb-2">
                <ThemeToggle />
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-sm text-sidebar-foreground"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                ออกจากระบบ
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile header with drawer */}
        <div className="md:hidden fixed top-0 left-0 right-0 bg-sidebar border-b border-sidebar-border shadow-sm z-10 h-14">
          <div className="flex items-center justify-between p-3">
            <h1 className="text-lg font-semibold text-theme-purple">Hug Mind Self</h1>
            <div className="flex items-center space-x-2">
              <ThemeToggle />
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 p-0 text-sidebar-foreground">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-sidebar w-64 p-0">
                  <div className="p-4 border-b border-sidebar-border flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-theme-purple">Hug Mind Self</h2>
                    <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="p-1 text-sidebar-foreground">
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex flex-col justify-between h-[calc(100%-60px)]">
                    <nav className="p-4 space-y-2">
                      {menuItems.map((item, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          className={`w-full justify-start text-left text-sm text-sidebar-foreground ${
                            window.location.pathname === item.path
                              ? "bg-sidebar-accent text-sidebar-accent-foreground"
                              : ""
                          }`}
                          onClick={() => handleNavigation(item.path)}
                        >
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.name}
                        </Button>
                      ))}
                    </nav>
                    <div className="p-4 border-t border-sidebar-border">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-left text-sm text-sidebar-foreground"
                        onClick={signOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        ออกจากระบบ
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
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
