
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
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  FilterX,
  Calendar
} from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

// Mock data
const mockActivities = [
  { 
    id: "1", 
    userId: "1", 
    userName: "สมชาย ใจดี", 
    email: "somchai@example.com", 
    action: "login", 
    timestamp: "2023-09-10 10:30:15",
    details: "เข้าสู่ระบบจาก IP 192.168.1.1"
  },
  { 
    id: "2", 
    userId: "1", 
    userName: "สมชาย ใจดี", 
    email: "somchai@example.com", 
    action: "completed_cohesion", 
    timestamp: "2023-09-10 11:45:22",
    details: "ทำกิจกรรม 'ฝึกสติ' เสร็จสมบูรณ์"
  },
  { 
    id: "3", 
    userId: "2", 
    userName: "วันดี มาก", 
    email: "wandee@example.com", 
    action: "login", 
    timestamp: "2023-09-09 09:12:45",
    details: "เข้าสู่ระบบจาก IP 192.168.1.2"
  },
  { 
    id: "4", 
    userId: "3", 
    userName: "มานะ ดีใจ", 
    email: "mana@example.com", 
    action: "login", 
    timestamp: "2023-09-08 14:22:30",
    details: "เข้าสู่ระบบจาก IP 192.168.1.3"
  },
  { 
    id: "5", 
    userId: "3", 
    userName: "มานะ ดีใจ", 
    email: "mana@example.com", 
    action: "task_completed", 
    timestamp: "2023-09-08 15:10:05",
    details: "ทำภารกิจ 'บันทึกความรู้สึก' เสร็จสมบูรณ์"
  },
  { 
    id: "6", 
    userId: "4", 
    userName: "สมหญิง รักดี", 
    email: "somying@example.com", 
    action: "profile_update", 
    timestamp: "2023-09-07 16:40:12",
    details: "อัปเดตอีเมลและชื่อผู้ใช้"
  },
  { 
    id: "7", 
    userId: "5", 
    userName: "ประสิทธิ์ มีแรง", 
    email: "prasit@example.com", 
    action: "login", 
    timestamp: "2023-09-06 08:55:40",
    details: "เข้าสู่ระบบจาก IP 192.168.1.5"
  },
  { 
    id: "8", 
    userId: "4", 
    userName: "สมหญิง รักดี", 
    email: "somying@example.com", 
    action: "signup", 
    timestamp: "2023-09-05 09:20:10",
    details: "สมัครสมาชิกใหม่"
  },
  { 
    id: "9", 
    userId: "5", 
    userName: "ประสิทธิ์ มีแรง", 
    email: "prasit@example.com", 
    action: "password_reset", 
    timestamp: "2023-09-04 14:15:30",
    details: "รีเซ็ตรหัสผ่าน"
  },
  { 
    id: "10", 
    userId: "1", 
    userName: "สมชาย ใจดี", 
    email: "somchai@example.com", 
    action: "task_completed", 
    timestamp: "2023-09-03 12:30:00",
    details: "ทำภารกิจ 'ฝึกหายใจ' เสร็จสมบูรณ์"
  },
];

const AdminActivity = () => {
  const [activities, setActivities] = useState(mockActivities);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter activities based on search term
  const filteredActivities = activities.filter(activity => 
    activity.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    activity.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedActivities = filteredActivities.slice(startIndex, startIndex + itemsPerPage);

  // Get activity display text
  const getActionText = (action: string) => {
    switch (action) {
      case "login": return "เข้าสู่ระบบ";
      case "completed_cohesion": return "ทำกิจกรรมเสร็จสมบูรณ์";
      case "task_completed": return "ทำภารกิจเสร็จสมบูรณ์";
      case "profile_update": return "อัปเดตโปรไฟล์";
      case "signup": return "สมัครสมาชิก";
      case "password_reset": return "รีเซ็ตรหัสผ่าน";
      default: return action;
    }
  };

  // Get action badge color
  const getActionColor = (action: string) => {
    switch (action) {
      case "login": return "bg-blue-100 text-blue-800";
      case "completed_cohesion": return "bg-green-100 text-green-800";
      case "task_completed": return "bg-green-100 text-green-800";
      case "profile_update": return "bg-yellow-100 text-yellow-800";
      case "signup": return "bg-purple-100 text-purple-800";
      case "password_reset": return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">กิจกรรมของผู้ใช้</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>บันทึกกิจกรรมทั้งหมด</CardTitle>
          <CardDescription>
            ติดตามการใช้งานของผู้ใช้ในระบบ
          </CardDescription>
          
          <div className="flex items-center mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="ค้นหากิจกรรม..."
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
            <Button variant="outline" size="sm" className="ml-2">
              <Calendar className="h-4 w-4 mr-1" />
              กรองตามวันที่
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ผู้ใช้</TableHead>
                  <TableHead>อีเมล</TableHead>
                  <TableHead>การกระทำ</TableHead>
                  <TableHead>เวลา</TableHead>
                  <TableHead>รายละเอียด</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedActivities.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      ไม่พบกิจกรรมที่ตรงกับการค้นหา
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedActivities.map((activity) => (
                    <TableRow key={activity.id}>
                      <TableCell className="font-medium">{activity.userName}</TableCell>
                      <TableCell>{activity.email}</TableCell>
                      <TableCell>
                        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getActionColor(activity.action)}`}>
                          {getActionText(activity.action)}
                        </div>
                      </TableCell>
                      <TableCell>{activity.timestamp}</TableCell>
                      <TableCell>{activity.details}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: totalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminActivity;
