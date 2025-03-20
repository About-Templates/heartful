
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { UserPlus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: string;
  lastLogin: string;
}

interface CreateUserFormProps {
  onCreateUser: (user: User) => void;
}

// Create user form schema
const createUserSchema = z.object({
  name: z.string().min(2, {
    message: "ชื่อต้องมีความยาวอย่างน้อย 2 ตัวอักษร",
  }),
  email: z.string().email({
    message: "กรุณากรอกอีเมลให้ถูกต้อง",
  }),
  isAdmin: z.boolean().default(false),
  password: z.string().min(6, {
    message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร",
  }),
});

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onCreateUser }) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      isAdmin: false,
      password: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof createUserSchema>) => {
    // Create a new user object
    const newUser = {
      id: Date.now().toString(),
      name: values.name,
      email: values.email,
      createdAt: new Date().toISOString().split('T')[0],
      status: "active",
      lastLogin: "-"
    };
    
    // Call the onCreateUser prop
    onCreateUser(newUser);
    
    // Show success toast
    toast({
      title: "เพิ่มผู้ใช้สำเร็จ",
      description: `ผู้ใช้ ${values.name} ถูกเพิ่มเรียบร้อยแล้ว`,
    });
    
    // Reset the form
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ชื่อ</FormLabel>
              <FormControl>
                <Input placeholder="ชื่อผู้ใช้" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>อีเมล</FormLabel>
              <FormControl>
                <Input type="email" placeholder="อีเมล" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รหัสผ่าน</FormLabel>
              <FormControl>
                <Input 
                  type="password" 
                  placeholder="รหัสผ่าน" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="isAdmin"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">
                  สิทธิ์ผู้ดูแลระบบ
                </FormLabel>
                <FormDescription>
                  ผู้ใช้นี้จะมีสิทธิ์ในการจัดการระบบทั้งหมด
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
        
        <Button type="submit" className="w-full">
          <UserPlus className="mr-2 h-4 w-4" />
          เพิ่มผู้ใช้
        </Button>
      </form>
    </Form>
  );
};

export default CreateUserForm;
