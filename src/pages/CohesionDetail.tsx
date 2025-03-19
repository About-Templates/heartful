
import { useParams, useNavigate } from "react-router-dom";
import { useCohesion } from "@/contexts/CohesionContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MainLayout from "@/components/MainLayout";
import { Heart, Activity, ChevronLeft, Calendar, CheckCircle2, XCircle } from "lucide-react";

const CohesionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { 
    getCohesionById, 
    getCompletionRate, 
    getCurrentStreak,
    getLongestStreak,
    getCompletionHistory,
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
  const isCompletedToday = history.some(entry => entry.date === today);
  
  // Handle completion for today
  const handleMarkComplete = () => {
    if (!isCompletedToday) {
      markCompleted(cohesion.id);
    }
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
                <div className="flex items-center justify-center p-4">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mr-3" />
                  <div>
                    <p className="font-medium">ทำสำเร็จแล้ว!</p>
                    <p className="text-sm text-gray-500">คุณทำสำเร็จแล้วในวันนี้</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <p className="mb-4">คุณทำสำเร็จกิจกรรมนี้ในวันนี้แล้วหรือยัง?</p>
                  <Button 
                    className="bg-theme-purple hover:bg-theme-purple-dark"
                    onClick={handleMarkComplete}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    ทำสำเร็จแล้ว
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* History calendar section */}
        <Card className="mb-8">
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
                    className="flex flex-col items-center p-2 border rounded-md w-16"
                    title={new Date(entry.date).toLocaleDateString('th-TH')}
                  >
                    <span className="text-xs text-gray-500">
                      {new Date(entry.date).toLocaleDateString('th-TH', {day: 'numeric', month: 'short'})}
                    </span>
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
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
    </MainLayout>
  );
};

export default CohesionDetail;
