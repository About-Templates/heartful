
import React from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import CreateUserForm from "./CreateUserForm";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: string;
  lastLogin: string;
}

interface CreateUserTabProps {
  onCreateUser: (user: User) => void;
}

const CreateUserTab: React.FC<CreateUserTabProps> = ({ onCreateUser }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>เพิ่มผู้ใช้ใหม่</CardTitle>
        <CardDescription>
          สร้างบัญชีผู้ใช้ใหม่ในระบบ
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CreateUserForm onCreateUser={onCreateUser} />
      </CardContent>
    </Card>
  );
};

export default CreateUserTab;
