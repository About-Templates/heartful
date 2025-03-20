
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import UsersTab from "@/components/admin/users/UsersTab";
import CreateUserTab from "@/components/admin/users/CreateUserTab";
import UserHistoryDialog from "@/components/admin/users/UserHistoryDialog";

// Mock users data
const mockUsers = [
  { 
    id: "1", 
    name: "สมชาย ใจดี", 
    email: "somchai@example.com", 
    createdAt: "2023-01-15", 
    status: "active",
    lastLogin: "2023-09-01"
  },
  { 
    id: "2", 
    name: "วันดี มาก", 
    email: "wandee@example.com", 
    createdAt: "2023-02-20", 
    status: "active",
    lastLogin: "2023-08-29"
  },
  { 
    id: "3", 
    name: "มานะ ดีใจ", 
    email: "mana@example.com", 
    createdAt: "2023-03-10", 
    status: "blocked",
    lastLogin: "2023-07-15"
  },
  { 
    id: "4", 
    name: "สมหญิง รักดี", 
    email: "somying@example.com", 
    createdAt: "2023-03-15", 
    status: "active",
    lastLogin: "2023-09-05"
  },
  { 
    id: "5", 
    name: "ประสิทธิ์ มีแรง", 
    email: "prasit@example.com", 
    createdAt: "2023-04-20", 
    status: "active",
    lastLogin: "2023-08-30"
  },
];

// User activities
const mockUserActivities = [
  { id: "1", userId: "1", action: "login", timestamp: "2023-09-01 10:30:15" },
  { id: "2", userId: "1", action: "completed_cohesion", timestamp: "2023-09-01 11:45:22" },
  { id: "3", userId: "2", action: "login", timestamp: "2023-08-29 09:12:45" },
  { id: "4", userId: "3", action: "login", timestamp: "2023-07-15 14:22:30" },
  { id: "5", userId: "3", action: "task_completed", timestamp: "2023-07-15 15:10:05" },
  { id: "6", userId: "4", action: "profile_update", timestamp: "2023-09-05 16:40:12" },
  { id: "7", userId: "5", action: "login", timestamp: "2023-08-30 08:55:40" },
];

// Types for our user and activity data
interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: string;
  lastLogin: string;
}

interface UserActivity {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [activities, setActivities] = useState<UserActivity[]>(mockUserActivities);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserHistory, setShowUserHistory] = useState(false);
  const { toast } = useToast();

  const handleCreateUser = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  const handleToggleUserStatus = (userId: string, newStatus: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    const user = users.find(u => u.id === userId);
    const action = newStatus === "active" ? "ปลดบล็อก" : "บล็อก";
    
    toast({
      title: `${action}ผู้ใช้สำเร็จ`,
      description: `ผู้ใช้ ${user?.name} ถูก${action}เรียบร้อยแล้ว`,
    });
  };

  const handleViewUserHistory = (user: User) => {
    setSelectedUser(user);
    setShowUserHistory(true);
  };

  const handleDeleteUser = (userId: string) => {
    const userToDelete = users.find(u => u.id === userId);
    setUsers(users.filter(u => u.id !== userId));
    
    toast({
      title: "ลบผู้ใช้สำเร็จ",
      description: `ผู้ใช้ ${userToDelete?.name} ถูกลบเรียบร้อยแล้ว`,
    });
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">จัดการผู้ใช้ระบบ</h1>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="users">รายชื่อผู้ใช้</TabsTrigger>
          <TabsTrigger value="add">เพิ่มผู้ใช้ใหม่</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <UsersTab 
            users={users}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onViewHistory={handleViewUserHistory}
            onToggleStatus={handleToggleUserStatus}
            onDeleteUser={handleDeleteUser}
          />
        </TabsContent>
        
        <TabsContent value="add">
          <CreateUserTab onCreateUser={handleCreateUser} />
        </TabsContent>
      </Tabs>
      
      {/* User History Dialog */}
      <UserHistoryDialog 
        open={showUserHistory}
        onOpenChange={setShowUserHistory}
        selectedUser={selectedUser}
        userActivities={activities}
      />
    </div>
  );
};

export default AdminUsers;
