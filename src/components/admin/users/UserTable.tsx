
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Ban, 
  History,
  UserCheck,
  UserX
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: string;
  lastLogin: string;
}

interface UserTableProps {
  users: User[];
  searchTerm: string;
  onViewHistory: (user: User) => void;
  onToggleStatus: (userId: string, newStatus: string) => void;
  onDeleteUser: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({ 
  users, 
  searchTerm, 
  onViewHistory, 
  onToggleStatus,
  onDeleteUser
}) => {
  const { toast } = useToast();
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ชื่อ</TableHead>
            <TableHead>อีเมล</TableHead>
            <TableHead>วันที่สมัคร</TableHead>
            <TableHead>เข้าสู่ระบบล่าสุด</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead>การจัดการ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                ไม่พบผู้ใช้ที่ตรงกับการค้นหา
              </TableCell>
            </TableRow>
          ) : (
            filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === "active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {user.status === "active" ? "ใช้งานได้" : "ถูกบล็อก"}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onViewHistory(user)}
                    >
                      <History className="h-4 w-4 mr-1" />
                      ประวัติ
                    </Button>
                    
                    {user.status === "active" ? (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onToggleStatus(user.id, "blocked")}
                      >
                        <Ban className="h-4 w-4 mr-1" />
                        บล็อก
                      </Button>
                    ) : (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => onToggleStatus(user.id, "active")}
                      >
                        <UserCheck className="h-4 w-4 mr-1" />
                        ปลดบล็อก
                      </Button>
                    )}
                    
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => onDeleteUser(user.id)}
                    >
                      <UserX className="h-4 w-4 mr-1" />
                      ลบ
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
