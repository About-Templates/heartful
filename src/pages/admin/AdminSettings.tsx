
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Shield, Mail, User, Lock, Eye, EyeOff, Save } from "lucide-react";

// Form schemas
const securitySettingsSchema = z.object({
  loginAttempts: z.string().min(1, {
    message: "กรุณากรอกจำนวนครั้ง",
  }),
  sessionTimeout: z.string().min(1, {
    message: "กรุณากรอกระยะเวลา",
  }),
  enforceStrongPasswords: z.boolean().default(true),
  twoFactorAuth: z.boolean().default(false),
});

const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  adminAlerts: z.boolean().default(true),
  userSignupNotifications: z.boolean().default(true),
  emailSender: z.string().email({
    message: "กรุณากรอกอีเมลให้ถูกต้อง",
  }),
});

const userSettingsSchema = z.object({
  allowUserRegistration: z.boolean().default(true),
  requireEmailVerification: z.boolean().default(true),
  autoApproveAccounts: z.boolean().default(false),
  defaultTasksEnabled: z.boolean().default(true),
});

const AdminSettings = () => {
  const { toast } = useToast();
  const [showApiKey, setShowApiKey] = useState(false);
  
  // Forms
  const securityForm = useForm<z.infer<typeof securitySettingsSchema>>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      loginAttempts: "5",
      sessionTimeout: "60",
      enforceStrongPasswords: true,
      twoFactorAuth: false,
    },
  });
  
  const notificationForm = useForm<z.infer<typeof notificationSettingsSchema>>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailNotifications: true,
      adminAlerts: true,
      userSignupNotifications: true,
      emailSender: "noreply@example.com",
    },
  });
  
  const userSettingsForm = useForm<z.infer<typeof userSettingsSchema>>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      allowUserRegistration: true,
      requireEmailVerification: true,
      autoApproveAccounts: false,
      defaultTasksEnabled: true,
    },
  });
  
  // Submit handlers
  const onSecuritySubmit = (values: z.infer<typeof securitySettingsSchema>) => {
    console.log("Security settings:", values);
    toast({
      title: "บันทึกการตั้งค่าความปลอดภัยเรียบร้อยแล้ว",
      description: "การตั้งค่าความปลอดภัยได้รับการอัปเดต",
    });
  };
  
  const onNotificationSubmit = (values: z.infer<typeof notificationSettingsSchema>) => {
    console.log("Notification settings:", values);
    toast({
      title: "บันทึกการตั้งค่าการแจ้งเตือนเรียบร้อยแล้ว",
      description: "การตั้งค่าการแจ้งเตือนได้รับการอัปเดต",
    });
  };
  
  const onUserSettingsSubmit = (values: z.infer<typeof userSettingsSchema>) => {
    console.log("User settings:", values);
    toast({
      title: "บันทึกการตั้งค่าผู้ใช้เรียบร้อยแล้ว",
      description: "การตั้งค่าผู้ใช้ได้รับการอัปเดต",
    });
  };

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
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5 text-blue-500" />
                ตั้งค่าความปลอดภัย
              </CardTitle>
              <CardDescription>
                กำหนดการตั้งค่าความปลอดภัยสำหรับระบบทั้งหมด
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={securityForm.control}
                      name="loginAttempts"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>จำนวนครั้งที่ล็อกอินล้มเหลวสูงสุด</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" max="10" {...field} />
                          </FormControl>
                          <FormDescription>
                            จำนวนครั้งที่ผู้ใช้สามารถล็อกอินล้มเหลวก่อนถูกบล็อก
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="sessionTimeout"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ระยะเวลาหมดเซสชัน (นาที)</FormLabel>
                          <FormControl>
                            <Input type="number" min="5" max="1440" {...field} />
                          </FormControl>
                          <FormDescription>
                            ระยะเวลาที่ผู้ใช้ไม่มีกิจกรรมก่อนถูกตัดเซสชัน
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <FormField
                      control={securityForm.control}
                      name="enforceStrongPasswords"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              บังคับใช้รหัสผ่านที่มีความปลอดภัยสูง
                            </FormLabel>
                            <FormDescription>
                              รหัสผ่านต้องประกอบด้วยตัวอักษรตัวใหญ่ ตัวเล็ก ตัวเลข และอักขระพิเศษ
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="twoFactorAuth"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              เปิดใช้งานการยืนยันตัวตนสองขั้นตอน
                            </FormLabel>
                            <FormDescription>
                              ผู้ใช้จะต้องยืนยันตัวตนด้วยรหัสที่ส่งไปยังอีเมลเมื่อล็อกอิน
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    บันทึกการตั้งค่าความปลอดภัย
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-green-500" />
                ตั้งค่าการแจ้งเตือน
              </CardTitle>
              <CardDescription>
                กำหนดวิธีการแจ้งเตือนและอีเมลของระบบ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                  <FormField
                    control={notificationForm.control}
                    name="emailSender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>อีเมลผู้ส่ง</FormLabel>
                        <FormControl>
                          <Input placeholder="noreply@example.com" {...field} />
                        </FormControl>
                        <FormDescription>
                          อีเมลที่ใช้สำหรับส่งการแจ้งเตือนถึงผู้ใช้
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <FormField
                      control={notificationForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              การแจ้งเตือนทางอีเมล
                            </FormLabel>
                            <FormDescription>
                              ส่งการแจ้งเตือนทางอีเมลเมื่อมีกิจกรรมสำคัญ
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="adminAlerts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              การแจ้งเตือนผู้ดูแลระบบ
                            </FormLabel>
                            <FormDescription>
                              ส่งการแจ้งเตือนถึงผู้ดูแลระบบเมื่อมีเหตุการณ์สำคัญ
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="userSignupNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              แจ้งเตือนเมื่อมีผู้ใช้ใหม่
                            </FormLabel>
                            <FormDescription>
                              ส่งการแจ้งเตือนเมื่อมีผู้ใช้สมัครใหม่
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    บันทึกการตั้งค่าการแจ้งเตือน
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* User Settings */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5 text-purple-500" />
                ตั้งค่าผู้ใช้
              </CardTitle>
              <CardDescription>
                กำหนดนโยบายและการตั้งค่าสำหรับผู้ใช้ในระบบ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...userSettingsForm}>
                <form onSubmit={userSettingsForm.handleSubmit(onUserSettingsSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={userSettingsForm.control}
                      name="allowUserRegistration"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              อนุญาตให้สมัครสมาชิกใหม่
                            </FormLabel>
                            <FormDescription>
                              ผู้ใช้สามารถสมัครสมาชิกใหม่ได้เอง
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={userSettingsForm.control}
                      name="requireEmailVerification"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              ต้องยืนยันอีเมล
                            </FormLabel>
                            <FormDescription>
                              ผู้ใช้ต้องยืนยันอีเมลก่อนจึงจะสามารถใช้งานระบบได้
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!userSettingsForm.getValues("allowUserRegistration")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={userSettingsForm.control}
                      name="autoApproveAccounts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              อนุมัติบัญชีอัตโนมัติ
                            </FormLabel>
                            <FormDescription>
                              บัญชีผู้ใช้ใหม่จะได้รับการอนุมัติโดยอัตโนมัติ
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              disabled={!userSettingsForm.getValues("allowUserRegistration")}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={userSettingsForm.control}
                      name="defaultTasksEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">
                              เปิดใช้งานภารกิจเริ่มต้น
                            </FormLabel>
                            <FormDescription>
                              ผู้ใช้ใหม่จะได้รับภารกิจเริ่มต้นโดยอัตโนมัติ
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Save className="mr-2 h-4 w-4" />
                    บันทึกการตั้งค่าผู้ใช้
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* API Settings */}
        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5 text-red-500" />
                การตั้งค่า API
              </CardTitle>
              <CardDescription>
                จัดการคีย์ API และการเข้าถึง
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">API Key</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    ใช้คีย์นี้เพื่อเข้าถึงระบบผ่าน API (โปรดเก็บคีย์นี้ไว้เป็นความลับ)
                  </p>
                  
                  <div className="flex">
                    <div className="relative flex-1">
                      <Input 
                        type={showApiKey ? "text" : "password"} 
                        value="hms_api_12345678abcdefghijk" 
                        readOnly
                        className="pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowApiKey(!showApiKey)}
                      >
                        {showApiKey ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <Button variant="outline" className="ml-2">
                      คัดลอก
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">ขีดจำกัด API</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">จำนวนคำขอสูงสุดต่อนาที:</span>
                      <Input 
                        type="number" 
                        defaultValue="60" 
                        className="w-24 text-right" 
                      />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">จำนวนคำขอสูงสุดต่อวัน:</span>
                      <Input 
                        type="number" 
                        defaultValue="10000" 
                        className="w-24 text-right" 
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Webhooks</h3>
                  <div className="rounded-md border p-4">
                    <div className="mb-4">
                      <FormLabel>URL สำหรับ Webhook</FormLabel>
                      <Input placeholder="https://your-webhook-url.com/api" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Switch id="event-user-signup" />
                        <Label htmlFor="event-user-signup" className="ml-2">
                          เหตุการณ์สมัครสมาชิก
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Switch id="event-task-complete" />
                        <Label htmlFor="event-task-complete" className="ml-2">
                          เหตุการณ์ทำภารกิจเสร็จ
                        </Label>
                      </div>
                      <div className="flex items-center">
                        <Switch id="event-cohesion-complete" />
                        <Label htmlFor="event-cohesion-complete" className="ml-2">
                          เหตุการณ์ทำกิจกรรมเสร็จ
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Save className="mr-2 h-4 w-4" />
                บันทึกการตั้งค่า API
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
