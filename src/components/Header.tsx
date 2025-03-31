
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, User, LogOut, Settings, Menu, X } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: "หน้าหลัก", path: "/" },
    { name: "เกี่ยวกับเรา", path: "/about" },
    { name: "บริการ", path: "/services" },
    { name: "ติดต่อ", path: "/contact" },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="py-4 px-6 md:px-8 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and title */}
        <div className="flex items-center space-x-2" onClick={() => navigate("/")} role="button">
          <Heart className="h-8 w-8 text-theme-purple" />
          <span className="font-semibold text-xl md:text-2xl gradient-text">Hug Mind Self</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          {!user && navItems.map((item) => (
            <Button 
              key={item.path}
              variant="ghost" 
              onClick={() => navigate(item.path)}
              className={isActive(item.path) ? "bg-accent/50 text-accent-foreground" : ""}
            >
              {item.name}
            </Button>
          ))}
          
          {user ? (
            <>
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>แดชบอร์ด</Button>
              <Button variant="ghost" onClick={() => navigate("/cohesion")}>กิจกรรม</Button>
              <Button variant="ghost" onClick={() => navigate("/tasks")}>งาน</Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=9b87f5&color=fff`} alt={user.name} />
                      <AvatarFallback className="bg-theme-purple text-white">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>โปรไฟล์</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>ตั้งค่า</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>ออกจากระบบ</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Button variant="ghost" onClick={() => navigate("/login")}>เข้าสู่ระบบ</Button>
              <Button className="bg-theme-purple hover:bg-theme-purple-dark button-hover" onClick={() => navigate("/signup")}>สมัครสมาชิก</Button>
            </>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <Heart className="h-6 w-6 text-theme-purple" />
                  <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex flex-col space-y-3">
                  {!user && navItems.map((item) => (
                    <Button 
                      key={item.path}
                      variant="ghost" 
                      className="justify-start"
                      onClick={() => {
                        navigate(item.path);
                        setMobileMenuOpen(false);
                      }}
                    >
                      {item.name}
                    </Button>
                  ))}
                  
                  {user ? (
                    <>
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar>
                          <AvatarImage src={`https://ui-avatars.com/api/?name=${user.name}&background=9b87f5&color=fff`} alt={user.name} />
                          <AvatarFallback className="bg-theme-purple text-white">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-sm font-medium">{user.name}</div>
                      </div>
                      <Button 
                        variant="ghost" 
                        className="justify-start"
                        onClick={() => {
                          navigate("/dashboard");
                          setMobileMenuOpen(false);
                        }}
                      >
                        แดชบอร์ด
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start"
                        onClick={() => {
                          navigate("/profile");
                          setMobileMenuOpen(false);
                        }}
                      >
                        <User className="mr-2 h-4 w-4" />
                        โปรไฟล์
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start"
                        onClick={() => {
                          navigate("/settings");
                          setMobileMenuOpen(false);
                        }}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        ตั้งค่า
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="justify-start"
                        onClick={() => {
                          signOut();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        ออกจากระบบ
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button 
                        variant="ghost" 
                        className="justify-start"
                        onClick={() => {
                          navigate("/login");
                          setMobileMenuOpen(false);
                        }}
                      >
                        เข้าสู่ระบบ
                      </Button>
                      <Button 
                        className="justify-start bg-theme-purple hover:bg-theme-purple-dark text-white"
                        onClick={() => {
                          navigate("/signup");
                          setMobileMenuOpen(false);
                        }}
                      >
                        สมัครสมาชิก
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
