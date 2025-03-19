
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCohesion, CohesionType } from "@/contexts/CohesionContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Activity, Brain, Book, Zap, Music, Coffee, Dumbbell, Plus, Calendar, Trash2, Edit, ChevronRight } from "lucide-react";

// Available icons for cohesion
const iconOptions = [
  { value: "heart", label: "หัวใจ", icon: <Heart className="w-4 h-4" /> },
  { value: "activity", label: "กิจกรรม", icon: <Activity className="w-4 h-4" /> },
  { value: "brain", label: "สมอง", icon: <Brain className="w-4 h-4" /> },
  { value: "book", label: "หนังสือ", icon: <Book className="w-4 h-4" /> },
  { value: "zap", label: "พลังงาน", icon: <Zap className="w-4 h-4" /> },
  { value: "music", label: "ดนตรี", icon: <Music className="w-4 h-4" /> },
  { value: "coffee", label: "กาแฟ", icon: <Coffee className="w-4 h-4" /> },
  { value: "dumbbell", label: "ออกกำลังกาย", icon: <Dumbbell className="w-4 h-4" /> },
];

// Available color options
const colorOptions = [
  { value: "purple", label: "ม่วง", className: "bg-theme-purple" },
  { value: "blue", label: "น้ำเงิน", className: "bg-blue-500" },
  { value: "green", label: "เขียว", className: "bg-green-500" },
  { value: "red", label: "แดง", className: "bg-red-500" },
  { value: "orange", label: "ส้ม", className: "bg-orange-500" },
  { value: "yellow", label: "เหลือง", className: "bg-yellow-500" },
  { value: "teal", label: "เขียวอมฟ้า", className: "bg-teal-500" },
  { value: "indigo", label: "คราม", className: "bg-indigo-500" },
];

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case "heart": return <Heart />;
    case "activity": return <Activity />;
    case "brain": return <Brain />;
    case "book": return <Book />;
    case "zap": return <Zap />;
    case "music": return <Music />;
    case "coffee": return <Coffee />;
    case "dumbbell": return <Dumbbell />;
    default: return <Heart />;
  }
};

const Cohesion = () => {
  const { cohesions, addCohesion, deleteCohesion, getCurrentStreak, getLongestStreak, getCompletionRate } = useCohesion();
  const navigate = useNavigate();
  
  // Form state for new cohesion
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("heart");
  const [color, setColor] = useState("purple");
  const [target, setTarget] = useState(30);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Handle form submission
  const handleSubmit = () => {
    addCohesion({
      name,
      description,
      icon,
      color,
      target
    });
    
    // Reset form and close dialog
    setName("");
    setDescription("");
    setIcon("heart");
    setColor("purple");
    setTarget(30);
    setDialogOpen(false);
  };
  
  // Helper functions for displaying text
  const formatStreak = (streak: number) => {
    return `${streak} วัน${streak > 0 ? 'ติดต่อกัน' : ''}`;
  };
  
  // Check if there are cohesions to display
  const hasCohesions = cohesions.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-6 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          {/* Header section */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold gradient-text mb-2">กิจกรรมประจำวัน</h1>
              <p className="text-gray-600">
                ติดตามนิสัยที่ดีของคุณและสร้างความต่อเนื่อง
              </p>
            </div>
            
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-theme-purple hover:bg-theme-purple-dark button-hover">
                  <Plus className="mr-2 h-4 w-4" />
                  เพิ่มกิจกรรมใหม่
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>เพิ่มกิจกรรมใหม่</DialogTitle>
                  <DialogDescription>
                    สร้างกิจกรรมใหม่เพื่อติดตามพฤติกรรมของคุณ
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">ชื่อกิจกรรม</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      placeholder="เช่น ฝึกสมาธิ" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">รายละเอียด</Label>
                    <Textarea 
                      id="description" 
                      value={description} 
                      onChange={(e) => setDescription(e.target.value)} 
                      placeholder="เช่น ฝึกสมาธิ 10 นาทีทุกวัน" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="icon">ไอคอน</Label>
                    <Select value={icon} onValueChange={setIcon}>
                      <SelectTrigger id="icon" className="w-full">
                        <SelectValue placeholder="เลือกไอคอน" />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="flex items-center">
                            <div className="flex items-center">
                              <span className="mr-2">{option.icon}</span>
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="color">สี</Label>
                    <Select value={color} onValueChange={setColor}>
                      <SelectTrigger id="color" className="w-full">
                        <SelectValue placeholder="เลือกสี" />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center">
                              <div className={`w-4 h-4 rounded-full mr-2 ${option.className}`} />
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="target">เป้าหมายจำนวนวัน</Label>
                    <Input 
                      id="target" 
                      type="number" 
                      min="1" 
                      max="366" 
                      value={target} 
                      onChange={(e) => setTarget(parseInt(e.target.value))} 
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>ยกเลิก</Button>
                  <Button 
                    className="bg-theme-purple hover:bg-theme-purple-dark" 
                    onClick={handleSubmit}
                    disabled={!name} // Disable if no name is provided
                  >
                    เพิ่มกิจกรรม
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Cohesions grid */}
          {hasCohesions ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cohesions.map((cohesion) => {
                const currentStreak = getCurrentStreak(cohesion.id);
                const longestStreak = getLongestStreak(cohesion.id);
                const completionRate = getCompletionRate(cohesion.id);
                const IconComponent = getIconComponent(cohesion.icon);
                
                return (
                  <Card key={cohesion.id} className="card-hover">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className={`p-2 rounded-full bg-${cohesion.color}-100 text-${cohesion.color}-500 mr-3`}>
                            {IconComponent}
                          </div>
                          {cohesion.name}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon" onClick={() => deleteCohesion(cohesion.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardTitle>
                      <CardDescription>{cohesion.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">ความก้าวหน้า</span>
                          <span className="font-medium">{completionRate}%</span>
                        </div>
                        <Progress value={completionRate} className="h-2" />
                        
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-xs text-gray-500 mb-1">ปัจจุบัน</p>
                            <p className="font-semibold">{formatStreak(currentStreak)}</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-md">
                            <p className="text-xs text-gray-500 mb-1">สถิติสูงสุด</p>
                            <p className="font-semibold">{formatStreak(longestStreak)}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full border-theme-purple text-theme-purple"
                        onClick={() => navigate(`/cohesion/${cohesion.id}`)}
                      >
                        ดูรายละเอียด
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center p-12 bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="mx-auto w-16 h-16 bg-theme-purple-light rounded-full flex items-center justify-center mb-6">
                <Calendar className="h-8 w-8 text-theme-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ยังไม่มีกิจกรรม</h3>
              <p className="text-gray-600 mb-6">
                เริ่มต้นสร้างกิจกรรมแรกของคุณเพื่อติดตามและสร้างนิสัยที่ดี
              </p>
              <Button 
                className="bg-theme-purple hover:bg-theme-purple-dark button-hover"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                เพิ่มกิจกรรมแรกของคุณ
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cohesion;
