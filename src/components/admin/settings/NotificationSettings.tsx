
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Save } from "lucide-react";
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

const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  adminAlerts: z.boolean().default(true),
  userSignupNotifications: z.boolean().default(true),
  emailSender: z.string().email({
    message: "กรุณากรอกอีเมลให้ถูกต้อง",
  }),
});

export type NotificationSettingsValues = z.infer<typeof notificationSettingsSchema>;

const NotificationSettings = () => {
  const { toast } = useToast();
  
  const form = useForm<NotificationSettingsValues>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailNotifications: true,
      adminAlerts: true,
      userSignupNotifications: true,
      emailSender: "noreply@example.com",
    },
  });
  
  const onSubmit = (values: NotificationSettingsValues) => {
    console.log("Notification settings:", values);
    toast({
      title: "บันทึกการตั้งค่าการแจ้งเตือนเรียบร้อยแล้ว",
      description: "การตั้งค่าการแจ้งเตือนได้รับการอัปเดต",
    });
  };

  return (
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
  );
};

export default NotificationSettings;
