
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCohesion, CohesionType } from "@/contexts/CohesionContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowLeft, CheckCircle, Calendar as CalendarIcon, Edit, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { th } from "date-fns/locale";

const CohesionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { cohesions, markDay, getCompletionRate, getCurrentStreak, getLongestStreak } = useCohesion();
  const [cohesion, setCohesion] = useState<CohesionType | undefined>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [note, setNote] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (id) {
      const currentCohesion = cohesions.find(c => c.id === id);
      setCohesion(currentCohesion);

      if (currentCohesion && selectedDate) {
        const dateString = format(selectedDate, "yyyy-MM-dd");
        const existingDay = currentCohesion.days.find(day => day.date === dateString);
        if (existingDay) {
          setIsCompleted(existingDay.completed);
          setNote(existingDay.note || "");
        } else {
          setIsCompleted(false);
          setNote("");
        }
      }
    }
  }, [id, cohesions, selectedDate]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleToggleComplete = () => {
    if (id && selectedDate) {
      const dateString = format(selectedDate, "yyyy-MM-dd");
      markDay(id, dateString, !isCompleted, note);
      setIsCompleted(!isCompleted);
    }
  };

  const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };

  const handleSaveNote = () => {
    if (id && selectedDate) {
      const dateString = format(selectedDate, "yyyy-MM-dd");
      markDay(id, dateString, isCompleted, note);
    }
  };

  if (!cohesion) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-8 px-6 md:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-500">ไม่พบกิจกรรมที่คุณต้องการ</p>
            <Button className="mt-4" asChild>
              <Link to="/cohesion">กลับไปหน้ากิจกรรม</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-6 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button variant="ghost" size="sm" asChild className="mb-2">
              <Link to="/cohesion" className="flex items-center text-gray-500">
                <ArrowLeft className="h-4 w-4 mr-1" />
                กลับไปหน้ากิจกรรม
              </Link>
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <h1 className="text-3xl font-bold gradient-text mb-2">{cohesion.name}</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1 text-theme-purple" />
                  {getCurrentStreak(cohesion.id)} วันต่อเนื่อง
                </span>
                <span>•</span>
                <span>{getCompletionRate(cohesion.id)}% สำเร็จ</span>
              </div>
            </div>
            <p className="text-gray-600">{cohesion.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Stats Cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-theme-purple" />
                  วันต่อเนื่องปัจจุบัน
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{getCurrentStreak(cohesion.id)}</p>
                <p className="text-xs text-gray-500">วัน</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-theme-purple" />
                  วันต่อเนื่องสูงสุด
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{getLongestStreak(cohesion.id)}</p>
                <p className="text-xs text-gray-500">วัน</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-theme-purple" />
                  อัตราความสำเร็จ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{getCompletionRate(cohesion.id)}%</p>
                <p className="text-xs text-gray-500">ของวันทั้งหมด</p>
              </CardContent>
            </Card>
            
            {/* Calendar Section */}
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarIcon className="mr-2 h-5 w-5 text-theme-purple" />
                    ปฏิทินกิจกรรม
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="border rounded-md p-3"
                    locale={th}
                    modifiers={{
                      completed: cohesion.days
                        .filter(day => day.completed)
                        .map(day => new Date(day.date)),
                    }}
                    modifiersStyles={{
                      completed: { backgroundColor: '#c084fc', color: 'white' }
                    }}
                  />
                </CardContent>
              </Card>
            </div>
            
            {/* Daily Notes Section */}
            <div className="md:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Edit className="mr-2 h-5 w-5 text-theme-purple" />
                    บันทึกประจำวัน
                  </CardTitle>
                  <p className="text-sm text-gray-500">
                    {selectedDate && format(selectedDate, "d MMMM yyyy", { locale: th })}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Button 
                      onClick={handleToggleComplete}
                      variant={isCompleted ? "default" : "outline"}
                      className={isCompleted ? "bg-theme-purple hover:bg-theme-purple-dark" : ""}
                    >
                      {isCompleted ? "ทำเสร็จแล้ว ✓" : "ยังไม่ได้ทำ"}
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="note" className="text-sm font-medium">
                      บันทึก
                    </label>
                    <Textarea
                      id="note"
                      placeholder="บันทึกสิ่งที่คุณได้เรียนรู้หรือความรู้สึก..."
                      value={note}
                      onChange={handleNoteChange}
                      className="min-h-[120px]"
                    />
                    <Button 
                      onClick={handleSaveNote} 
                      className="w-full mt-2"
                      variant="outline"
                    >
                      บันทึก
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CohesionDetail;
