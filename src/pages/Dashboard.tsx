
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCohesion } from "@/contexts/CohesionContext";
import { useTasks } from "@/contexts/TasksContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { Heart, Activity, CheckCircle, Calendar, Plus, ArrowRight } from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const { cohesions, getCurrentStreak, getLongestStreak } = useCohesion();
  const { tasks } = useTasks();
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  
  // List of Thai motivational quotes
  const quotes = [
    "การเดินทางพันไมล์เริ่มต้นด้วยก้าวแรก",
    "ความสุขไม่ได้อยู่ที่จุดหมาย แต่อยู่ที่การเดินทาง",
    "ทุกปัญหามีทางออก อย่ายอมแพ้",
    "ทุกการเปลี่ยนแปลงเริ่มต้นจากตัวเรา",
    "เวลาที่ดีที่สุดในการปลูกต้นไม้คือ 20 ปีที่แล้ว เวลาที่ดีที่สุดลำดับถัดมาคือตอนนี้",
    "กำลังใจคือพลังสำคัญที่ทำให้เราเดินต่อไป",
    "ไม่มีอะไรที่เป็นไปไม่ได้ หากเรามีความตั้งใจจริง",
    "ทุกความสำเร็จเริ่มต้นจากการกล้าที่จะลงมือทำ",
    "ความสำเร็จคือการก้าวจากความล้มเหลวหนึ่งไปสู่อีกความล้มเหลวหนึ่ง โดยไม่สูญเสียความกระตือรือร้น",
    "ลงมือทำวันนี้ เพื่อชีวิตที่ดีกว่าในวันพรุ่งนี้"
  ];
  
  // Get a random quote on component mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);
  
  // Calculate completed tasks for today
  const today = new Date().toISOString().split('T')[0];
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-6 md:px-8 bg-background">
        <div className="max-w-7xl mx-auto">
          {/* Welcome section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">สวัสดี, {user?.name}! 👋</h1>
            <p className="text-muted-foreground">
              ยินดีต้อนรับกลับมา นี่คือภาพรวมความก้าวหน้าของคุณในวันนี้
            </p>
          </div>

          {/* Quote of the day */}
          <Card className="mb-8 bg-gradient-to-r from-theme-purple to-theme-purple-dark text-white">
            <CardContent className="pt-6">
              <blockquote className="text-xl md:text-2xl italic font-medium text-center px-4 py-2">
                "{quote}"
              </blockquote>
              <p className="text-center mt-4 text-white/80">คำคมประจำวัน</p>
            </CardContent>
          </Card>
          
          {/* Dashboard grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Task progress card */}
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg font-medium">
                  <CheckCircle className="mr-2 h-5 w-5 text-theme-purple" />
                  ความคืบหน้าของงาน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Progress value={completionPercentage} className="h-2" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>เสร็จแล้ว {completedTasks} จาก {totalTasks} งาน</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4 border-theme-purple text-theme-purple dark:border-theme-purple dark:text-theme-purple"
                    onClick={() => navigate("/tasks")}
                  >
                    ดูงานทั้งหมด
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Today's habit card */}
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg font-medium">
                  <Heart className="mr-2 h-5 w-5 text-theme-purple" />
                  กิจกรรมประจำวัน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cohesions.length > 0 ? (
                    <div className="space-y-4">
                      {cohesions.slice(0, 3).map((cohesion) => (
                        <div key={cohesion.id} className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full bg-theme-${cohesion.color} mr-3`}></div>
                            <span className="text-foreground">{cohesion.name}</span>
                          </div>
                          <span className="text-sm font-medium">
                            {getCurrentStreak(cohesion.id)} วันติดต่อกัน
                          </span>
                        </div>
                      ))}
                      <Button 
                        variant="outline" 
                        className="w-full mt-2 border-theme-purple text-theme-purple dark:border-theme-purple dark:text-theme-purple"
                        onClick={() => navigate("/cohesion")}
                      >
                        ดูกิจกรรมทั้งหมด
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground mb-4">ยังไม่มีกิจกรรมที่ติดตาม</p>
                      <Button 
                        variant="outline" 
                        className="border-theme-purple text-theme-purple dark:border-theme-purple dark:text-theme-purple"
                        onClick={() => navigate("/cohesion")}
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        เพิ่มกิจกรรมแรกของคุณ
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Stats card */}
            <Card className="card-hover">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-lg font-medium">
                  <Activity className="mr-2 h-5 w-5 text-theme-purple" />
                  สถิติของคุณ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-theme-purple">
                        {cohesions.length}
                      </p>
                      <p className="text-sm text-muted-foreground">กิจกรรมทั้งหมด</p>
                    </div>
                    <div className="bg-secondary p-4 rounded-lg text-center">
                      <p className="text-3xl font-bold text-theme-purple">
                        {cohesions.reduce((max, c) => {
                          const longest = getLongestStreak(c.id);
                          return longest > max ? longest : max;
                        }, 0)}
                      </p>
                      <p className="text-sm text-muted-foreground">สถิติสูงสุด</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full mt-2 border-theme-purple text-theme-purple dark:border-theme-purple dark:text-theme-purple"
                    onClick={() => navigate("/stats")}
                  >
                    ดูสถิติเพิ่มเติม
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Calendar section */}
          <Card className="mb-8 card-hover">
            <CardHeader>
              <CardTitle className="flex items-center text-xl font-medium">
                <Calendar className="mr-2 h-6 w-6 text-theme-purple" />
                ปฏิทินกิจกรรม
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p className="mb-4">จะมีการแสดงปฏิทินกิจกรรมที่นี่</p>
                <Button 
                  variant="outline" 
                  className="border-theme-purple text-theme-purple dark:border-theme-purple dark:text-theme-purple"
                >
                  ดูปฏิทินเต็มหน้าจอ
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
