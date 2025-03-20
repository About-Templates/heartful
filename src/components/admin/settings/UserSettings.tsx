
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { User, Save } from "lucide-react";
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
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const userSettingsSchema = z.object({
  allowUserRegistration: z.boolean().default(true),
  requireEmailVerification: z.boolean().default(true),
  autoApproveAccounts: z.boolean().default(false),
  defaultTasksEnabled: z.boolean().default(true),
});

export type UserSettingsValues = z.infer<typeof userSettingsSchema>;

const UserSettings = () => {
  const { toast } = useToast();
  
  const form = useForm<UserSettingsValues>({
    resolver: zodResolver(userSettingsSchema),
    defaultValues: {
      allowUserRegistration: true,
      requireEmailVerification: true,
      autoApproveAccounts: false,
      defaultTasksEnabled: true,
    },
  });
  
  const onSubmit = (values: UserSettingsValues) => {
    console.log("User settings:", values);
    toast({
      title: "บันทึกการตั้งค่าผู้ใช้เรียบร้อยแล้ว",
      description: "การตั้งค่าผู้ใช้ได้รับการอัปเดต",
    });
  };

  return (
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
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
                control={form.control}
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
                        disabled={!form.getValues("allowUserRegistration")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
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
                        disabled={!form.getValues("allowUserRegistration")}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
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
  );
};

export default UserSettings;
