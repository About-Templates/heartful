
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, User, LogOut, Settings } from "lucide-react";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="py-4 px-6 md:px-8 border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and title */}
        <div className="flex items-center space-x-2" onClick={() => navigate("/")} role="button">
          <Heart className="h-8 w-8 text-theme-purple" />
          <span className="font-semibold text-xl md:text-2xl gradient-text">Hug Mind Self</span>
        </div>

        {/* Navigation for logged in users */}
        {user ? (
          <div className="flex items-center space-x-4">
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
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Button variant="ghost" onClick={() => navigate("/login")}>เข้าสู่ระบบ</Button>
            <Button className="bg-theme-purple hover:bg-theme-purple-dark button-hover" onClick={() => navigate("/signup")}>สมัครสมาชิก</Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
