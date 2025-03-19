
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCohesion } from "@/contexts/CohesionContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import MainLayout from "@/components/MainLayout";
import { Heart, Activity, ChevronLeft, Calendar, CheckCircle2, XCircle, PenSquare, Clock } from "lucide-react";

const CohesionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const { 
    getCohesionById, 
    getCompletionRate, 
    getCurrentStreak,
    getLongestStreak,
    getCompletionHistory,
    markDay,
    markCompleted
  } = useCohesion();
  
  // Find the specific cohesion by ID
  const cohesion = getCohesionById(id || "");
  
  // If cohesion not found, redirect to cohesion page
  if (!cohesion) {
    navigate("/cohesion");
    return null;
  }
  
  const completionRate = getCompletionRate(cohesion.id);
  const currentStreak = getCurrentStreak(cohesion.id);
  const longestStreak = getLongestStreak(cohesion.id);
  const history = getCompletionHistory(cohesion.id);
  
  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];
  const todayEntry = cohesion.days.find(day => day.date === today);
  const isCompletedToday = todayEntry?.completed || false;
  const todayNote = todayEntry?.note || "";
  
  // Handle completion for today with note
  const handleMarkComplete = () => {
    markDay(cohesion.id, today, true, note);
    setNote("");
    setShowDialog(false);
  };

  // Handle adding or updating note
  const handleUpdateNote = () => {
    markDay(cohesion.id, today, true, note);
    setShowDialog(false);
  };
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Button 
            variant="ghost" 
            className="mr-4" 
            onClick={() => navigate('/cohesion')}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            กลับ
          </Button>
          <div>
            <h1 className="text-3xl font-bold gradient-text mb-2">{cohesion.name}</h1>
            <p className="text-gray-600">{cohesion.description}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Progress card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg font-medium">
                <Activity className="mr-2 h-5 w-5 text-theme-purple" />
                ความคืบหน้า
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Progress value={completionRate} className="h-3" />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>ความสำเร็จ</span>
                  <span>{completionRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Streak card */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg font-medium">
                <Heart className="mr-2 h-5 w-5 text-theme-purple" />
                ระยะเวลาต่อเนื่อง
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-500 mb-1">ปัจจุบัน</p>
                  <p className="font-semibold">{currentStreak} วันติดต่อกัน</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-xs text-gray-500 mb-1">สถิติสูงสุด</p>
                  <p className="font-semibold">{longestStreak} วันติดต่อกัน</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Mark completed card */}
          <Card className={isCompletedToday ? "bg-gray-50" : "border-theme-purple"}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center text-lg font-medium">
                <Calendar className="mr-2 h-5 w-5 text-theme-purple" />
                บันทึกวันนี้
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isCompletedToday ? (
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center">
                    <CheckCircle2 className="h-10 w-10 text-green-500 mr-3" />
                    <div>
                      <p className="font-medium">ทำสำเร็จแล้ว!</p>
                      <p className="text-sm text-gray-500">คุณทำสำเร็จแล้วในวันนี้</p>
                    </div>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <PenSquare className="h-4 w-4 mr-2" />
                        {todayNote ? "แก้ไขบันทึก" : "เพิ่มบันทึก"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>บันทึกของวันนี้</DialogTitle>
                        <DialogDescription>
                          {formatDate(today)} - {cohesion.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <Textarea 
                          placeholder="บันทึกความรู้สึกหรือประสบการณ์ของคุณในวันนี้..."
                          className="min-h-[100px]"
                          defaultValue={todayNote}
                          onChange={(e) => setNote(e.target.value)}
                        />
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="secondary">ยกเลิก</Button>
                        </DialogClose>
                        <Button type="button" onClick={handleUpdateNote}>บันทึก</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <Dialog open={showDialog} onOpenChange={setShowDialog}>
                  <DialogTrigger asChild>
                    <div className="text-center">
                      <p className="mb-4">คุณทำสำเร็จกิจกรรมนี้ในวันนี้แล้วหรือยัง?</p>
                      <Button 
                        className="bg-theme-purple hover:bg-theme-purple-dark"
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        ทำสำเร็จแล้ว
                      </Button>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>บันทึกความสำเร็จ</DialogTitle>
                      <DialogDescription>
                        เพิ่มบันทึกสั้นๆ เกี่ยวกับกิจกรรม "{cohesion.name}" ที่คุณทำในวันนี้
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Textarea 
                        placeholder="บันทึกความรู้สึกหรือประสบการณ์ของคุณในวันนี้..."
                        className="min-h-[100px]"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="button" variant="secondary" onClick={() => setShowDialog(false)}>
                        ยกเลิก
                      </Button>
                      <Button type="button" onClick={handleMarkComplete}>บันทึกความสำเร็จ</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Recent activity and history */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Notes section */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-medium">
                <PenSquare className="mr-2 h-6 w-6 text-theme-purple" />
                บันทึกล่าสุด
              </CardTitle>
              <CardDescription>
                ความคิดเห็นและประสบการณ์
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="space-y-4">
                {cohesion.days.filter(day => day.note).slice(0, 5).map((entry, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatDate(entry.date)}</span>
                    </div>
                    <p className="text-sm">{entry.note}</p>
                  </div>
                ))}
                
                {cohesion.days.filter(day => day.note).length === 0 && (
                  <div className="text-center p-8 text-gray-500">
                    ยังไม่มีบันทึกที่เพิ่มเข้ามา
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* History calendar section */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-medium">
                <Calendar className="mr-2 h-6 w-6 text-theme-purple" />
                ประวัติการทำสำเร็จ
              </CardTitle>
              <CardDescription>
                บันทึกวันที่คุณทำกิจกรรมนี้สำเร็จ
              </CardDescription>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="flex flex-wrap gap-2 mb-4">
                {history.length > 0 ? (
                  history.slice().reverse().slice(0, 30).map((entry, index) => (
                    <div 
                      key={index} 
                      className={`flex flex-col items-center p-2 border rounded-md w-16 ${
                        entry.completed ? 'border-green-500 bg-green-50' : 'border-gray-200'
                      }`}
                      title={new Date(entry.date).toLocaleDateString('th-TH')}
                    >
                      <span className="text-xs text-gray-500">
                        {new Date(entry.date).toLocaleDateString('th-TH', {day: 'numeric', month: 'short'})}
                      </span>
                      {entry.completed ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
                      ) : (
                        <XCircle className="h-4 w-4 text-gray-300 mt-1" />
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center w-full p-8 text-gray-500">
                    ยังไม่มีประวัติการทำกิจกรรมนี้
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default CohesionDetail;
