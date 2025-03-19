
import React from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Activity, Settings } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const adminModules = [
    {
      title: "จัดการผู้ใช้",
      description: "เพิ่ม ลบ แก้ไข และจัดการบัญชีผู้ใช้",
      icon: Users,
      path: "/admin/users"
    },
    {
      title: "กิจกรรมผู้ใช้",
      description: "ดูประวัติการใช้งานและกิจกรรมของผู้ใช้",
      icon: Activity,
      path: "/admin/activity"
    },
    {
      title: "ตั้งค่าระบบ",
      description: "ปรับแต่งการตั้งค่าระบบและแพลตฟอร์ม",
      icon: Settings,
      path: "/admin/settings"
    }
  ];

  return (
    <AdminLayout title="แดชบอร์ดผู้ดูแลระบบ">
      <div className="grid md:grid-cols-3 gap-6">
        {adminModules.map((module, index) => (
          <Card 
            key={index} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(module.path)}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{module.title}</CardTitle>
                <module.icon className="h-6 w-6 text-slate-600" />
              </div>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-blue-600">เข้าไปจัดการ</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
