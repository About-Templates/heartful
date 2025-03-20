
import React from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface UserActivity {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  status: string;
  lastLogin: string;
}

interface UserHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedUser: User | null;
  userActivities: UserActivity[];
}

const UserHistoryDialog: React.FC<UserHistoryDialogProps> = ({ 
  open, 
  onOpenChange, 
  selectedUser, 
  userActivities 
}) => {
  if (!selectedUser) return null;

  const getUserActivities = (userId: string) => {
    return userActivities.filter(activity => activity.userId === userId);
  };

  const userActivityList = getUserActivities(selectedUser.id);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>ประวัติการใช้งานของ {selectedUser.name}</DialogTitle>
          <DialogDescription>
            รายละเอียดการใช้งานของผู้ใช้นี้
          </DialogDescription>
        </DialogHeader>
        
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
          {userActivityList.length > 0 ? (
            <div className="space-y-4">
              {userActivityList.map((activity, idx) => (
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
        
        <DialogFooter className="sm:justify-end">
          <Button 
            variant="secondary" 
            onClick={() => onOpenChange(false)}
          >
            ปิด
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserHistoryDialog;
