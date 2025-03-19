
import { useCohesion } from "@/contexts/CohesionContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Activity, Calendar, Trophy, TrendingUp } from "lucide-react";

const Stats = () => {
  const { cohesions, getCurrentStreak, getLongestStreak, getCompletionRate } = useCohesion();
  
  // Calculate total stats
  const totalStreak = cohesions.reduce((sum, cohesion) => sum + getCurrentStreak(cohesion.id), 0);
  const highestStreak = cohesions.reduce((max, cohesion) => {
    const longest = getLongestStreak(cohesion.id);
    return longest > max ? longest : max;
  }, 0);
  const averageCompletion = cohesions.length > 0
    ? cohesions.reduce((sum, cohesion) => sum + getCompletionRate(cohesion.id), 0) / cohesions.length
    : 0;
  
  // Prepare chart data
  const streakData = cohesions.map(cohesion => ({
    name: cohesion.name,
    streak: getCurrentStreak(cohesion.id),
    longest: getLongestStreak(cohesion.id),
  }));
  
  const completionData = cohesions.map(cohesion => ({
    name: cohesion.name,
    value: getCompletionRate(cohesion.id),
  }));
  
  // Colors for pie chart
  const COLORS = ["#8b5cf6", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#ec4899"];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-6 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">สถิติการทำกิจกรรม</h1>
            <p className="text-gray-600">
              ติดตามและวิเคราะห์ความก้าวหน้าของกิจกรรมทั้งหมดของคุณ
            </p>
          </div>
          
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-theme-purple" />
                  จำนวนกิจกรรม
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{cohesions.length}</p>
                <p className="text-sm text-gray-500">กิจกรรมทั้งหมด</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-theme-purple" />
                  ติดต่อปัจจุบัน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{totalStreak}</p>
                <p className="text-sm text-gray-500">วันทั้งหมด</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-theme-purple" />
                  สถิติสูงสุด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{highestStreak}</p>
                <p className="text-sm text-gray-500">วันติดต่อกัน</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-md flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-theme-purple" />
                  ความต่อเนื่อง
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{averageCompletion.toFixed(0)}%</p>
                <p className="text-sm text-gray-500">เฉลี่ย</p>
              </CardContent>
            </Card>
          </div>
          
          {cohesions.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Streak comparison chart */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-6 w-6 mr-2 text-theme-purple" />
                    เปรียบเทียบความต่อเนื่อง
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={streakData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="streak" name="ปัจจุบัน" fill="#8b5cf6" />
                      <Bar dataKey="longest" name="สูงสุด" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              {/* Completion rate chart */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-6 w-6 mr-2 text-theme-purple" />
                    อัตราความสำเร็จ
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={completionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {completionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center">
              <Activity className="h-16 w-16 mx-auto mb-6 text-gray-300" />
              <h3 className="text-xl font-semibold mb-2">ยังไม่มีข้อมูลสถิติ</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                เมื่อคุณเริ่มติดตามกิจกรรม สถิติและกราฟจะแสดงที่นี่เพื่อช่วยให้คุณติดตามความก้าวหน้า
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Stats;
