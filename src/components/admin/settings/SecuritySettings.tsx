
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Shield, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

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

export type SecuritySettingsValues = z.infer<typeof securitySettingsSchema>;

const SecuritySettings = () => {
  const { toast } = useToast();
  
  const form = useForm<SecuritySettingsValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      loginAttempts: "5",
      sessionTimeout: "60",
      enforceStrongPasswords: true,
      twoFactorAuth: false,
    },
  });
  
  const onSubmit = (values: SecuritySettingsValues) => {
    console.log("Security settings:", values);
    toast({
      title: "บันทึกการตั้งค่าความปลอดภัยเรียบร้อยแล้ว",
      description: "การตั้งค่าความปลอดภัยได้รับการอัปเดต",
    });
  };

  return (
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
  );
};

export default SecuritySettings;
