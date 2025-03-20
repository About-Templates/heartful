
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import UserSearch from "./UserSearch";
import UserTable from "./UserTable";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: string;
  lastLogin: string;
}

interface UsersTabProps {
  users: User[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onViewHistory: (user: User) => void;
  onToggleStatus: (userId: string, newStatus: string) => void;
  onDeleteUser: (userId: string) => void;
}

const UsersTab: React.FC<UsersTabProps> = ({ 
  users, 
  searchTerm, 
  onSearchChange, 
  onViewHistory, 
  onToggleStatus,
  onDeleteUser
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>รายชื่อผู้ใช้ทั้งหมด</CardTitle>
        <CardDescription>
          จัดการผู้ใช้ในระบบ, เรียกดูประวัติการใช้งาน และตั้งค่าสถานะผู้ใช้
        </CardDescription>
        
        <UserSearch 
          searchTerm={searchTerm} 
          onSearchChange={onSearchChange} 
        />
      </CardHeader>
      <CardContent>
        <UserTable 
          users={users}
          searchTerm={searchTerm}
          onViewHistory={onViewHistory}
          onToggleStatus={onToggleStatus}
          onDeleteUser={onDeleteUser}
        />
      </CardContent>
    </Card>
  );
};

export default UsersTab;
