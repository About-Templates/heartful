
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SecuritySettings from "@/components/admin/settings/SecuritySettings";
import NotificationSettings from "@/components/admin/settings/NotificationSettings";
import UserSettings from "@/components/admin/settings/UserSettings";
import ApiSettings from "@/components/admin/settings/ApiSettings";

const AdminSettings = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">ตั้งค่าระบบผู้ดูแล</h1>
      
      <Tabs defaultValue="security" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="security">ความปลอดภัย</TabsTrigger>
          <TabsTrigger value="notifications">การแจ้งเตือน</TabsTrigger>
          <TabsTrigger value="users">ผู้ใช้</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
        </TabsList>
        
        {/* Security Settings */}
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <NotificationSettings />
        </TabsContent>
        
        {/* User Settings */}
        <TabsContent value="users">
          <UserSettings />
        </TabsContent>
        
        {/* API Settings */}
        <TabsContent value="api">
          <ApiSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
