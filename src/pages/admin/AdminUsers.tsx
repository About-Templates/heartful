
import React, { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { 
  Search, 
  UserPlus, 
  Ban, 
  History,
  UserCheck,
  UserX,
  FilterX
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

const AdminUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [activities, setActivities] = useState(mockUserActivities);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [showUserHistory, setShowUserHistory] = useState(false);
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

  const onCreateUser = (values: z.infer<typeof createUserSchema>) => {
    // In a real application, this would be an API call
    const newUser = {
      id: `${users.length + 1}`,
      name: values.name,
      email: values.email,
      createdAt: new Date().toISOString().split('T')[0],
      status: "active",
      lastLogin: "-"
    };
    
    setUsers([...users, newUser]);
    
    toast({
      title: "เพิ่มผู้ใช้สำเร็จ",
      description: `ผู้ใช้ ${values.name} ถูกเพิ่มเรียบร้อยแล้ว`,
    });
    
    form.reset();
  };

  const toggleUserStatus = (userId: string, newStatus: string) => {
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

  const getUserActivities = (userId: string) => {
    return activities.filter(activity => activity.userId === userId);
  };

  const viewUserHistory = (user: any) => {
    setSelectedUser(user);
    setShowUserHistory(true);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">จัดการผู้ใช้ระบบ</h1>
      
      <Tabs defaultValue="users" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="users">รายชื่อผู้ใช้</TabsTrigger>
          <TabsTrigger value="add">เพิ่มผู้ใช้ใหม่</TabsTrigger>
        </TabsList>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>รายชื่อผู้ใช้ทั้งหมด</CardTitle>
              <CardDescription>
                จัดการผู้ใช้ในระบบ, เรียกดูประวัติการใช้งาน และตั้งค่าสถานะผู้ใช้
              </CardDescription>
              
              <div className="flex items-center mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="ค้นหาผู้ใช้..."
                    className="pl-9"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSearchTerm("")}
                    className="ml-2"
                  >
                    <FilterX className="h-4 w-4 mr-1" />
                    ล้างตัวกรอง
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ชื่อ</TableHead>
                      <TableHead>อีเมล</TableHead>
                      <TableHead>วันที่สมัคร</TableHead>
                      <TableHead>เข้าสู่ระบบล่าสุด</TableHead>
                      <TableHead>สถานะ</TableHead>
                      <TableHead>การจัดการ</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          ไม่พบผู้ใช้ที่ตรงกับการค้นหา
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.createdAt}</TableCell>
                          <TableCell>{user.lastLogin}</TableCell>
                          <TableCell>
                            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              user.status === "active" 
                                ? "bg-green-100 text-green-800" 
                                : "bg-red-100 text-red-800"
                            }`}>
                              {user.status === "active" ? "ใช้งานได้" : "ถูกบล็อก"}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                onClick={() => viewUserHistory(user)}
                              >
                                <History className="h-4 w-4 mr-1" />
                                ประวัติ
                              </Button>
                              
                              {user.status === "active" ? (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  onClick={() => toggleUserStatus(user.id, "blocked")}
                                >
                                  <Ban className="h-4 w-4 mr-1" />
                                  บล็อก
                                </Button>
                              ) : (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => toggleUserStatus(user.id, "active")}
                                >
                                  <UserCheck className="h-4 w-4 mr-1" />
                                  ปลดบล็อก
                                </Button>
                              )}
                              
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => {
                                  setUsers(users.filter(u => u.id !== user.id));
                                  toast({
                                    title: "ลบผู้ใช้สำเร็จ",
                                    description: `ผู้ใช้ ${user.name} ถูกลบเรียบร้อยแล้ว`,
                                  });
                                }}
                              >
                                <UserX className="h-4 w-4 mr-1" />
                                ลบ
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>เพิ่มผู้ใช้ใหม่</CardTitle>
              <CardDescription>
                สร้างบัญชีผู้ใช้ใหม่ในระบบ
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onCreateUser)} className="space-y-6">
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* User History Dialog */}
      <Dialog open={showUserHistory} onOpenChange={setShowUserHistory}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>ประวัติการใช้งานของ {selectedUser?.name}</DialogTitle>
            <DialogDescription>
              รายละเอียดการใช้งานของผู้ใช้นี้
            </DialogDescription>
          </DialogHeader>
          
          {selectedUser && (
            <div className="max-h-96 overflow-y-auto">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">ข้อมูลผู้ใช้</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">อีเมล:</div>
                  <div>{selectedUser.email}</div>
                  <div className="text-gray-500">วันที่สมัคร:</div>
                  <div>{selectedUser.createdAt}</div>
                  <div className="text-gray-500">สถานะ:</div>
                  <div className={`${
                    selectedUser.status === "active" 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}>
                    {selectedUser.status === "active" ? "ใช้งานได้" : "ถูกบล็อก"}
                  </div>
                </div>
              </div>
              
              <h3 className="text-sm font-medium text-gray-500 mb-2">กิจกรรมล่าสุด</h3>
              {getUserActivities(selectedUser.id).length > 0 ? (
                <div className="space-y-4">
                  {getUserActivities(selectedUser.id).map((activity, idx) => (
                    <div key={idx} className="border-l-2 border-gray-200 pl-4 py-1">
                      <div className="text-xs text-gray-500">{activity.timestamp}</div>
                      <div className="mt-1">
                        {activity.action === "login" && "เข้าสู่ระบบ"}
                        {activity.action === "completed_cohesion" && "ทำกิจกรรมเสร็จสมบูรณ์"}
                        {activity.action === "task_completed" && "ทำภารกิจเสร็จสมบูรณ์"}
                        {activity.action === "profile_update" && "อัปเดตโปรไฟล์"}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-center py-4">
                  ไม่พบประวัติการใช้งาน
                </div>
              )}
            </div>
          )}
          
          <DialogFooter className="sm:justify-end">
            <Button 
              variant="secondary" 
              onClick={() => setShowUserHistory(false)}
            >
              ปิด
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
