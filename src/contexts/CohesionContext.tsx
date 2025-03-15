
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export type CohesionDay = {
  date: string;
  completed: boolean;
  note?: string;
};

export type CohesionType = {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  target: number;
  days: CohesionDay[];
  createdAt: string;
};

type CohesionContextType = {
  cohesions: CohesionType[];
  addCohesion: (cohesion: Omit<CohesionType, "id" | "createdAt" | "days">) => void;
  updateCohesion: (id: string, cohesion: Partial<CohesionType>) => void;
  deleteCohesion: (id: string) => void;
  markDay: (cohesionId: string, date: string, completed: boolean, note?: string) => void;
  getCurrentStreak: (cohesionId: string) => number;
  getLongestStreak: (cohesionId: string) => number;
  getCompletionRate: (cohesionId: string) => number;
};

const CohesionContext = createContext<CohesionContextType | undefined>(undefined);

const defaultCohesions: CohesionType[] = [
  {
    id: "1",
    name: "ฝึกสมาธิ",
    description: "ฝึกสมาธิทุกวัน อย่างน้อย 10 นาที",
    icon: "heart",
    color: "purple",
    target: 30,
    days: [],
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "ออกกำลังกาย",
    description: "ออกกำลังกายทุกวัน อย่างน้อย 30 นาที",
    icon: "activity",
    color: "blue",
    target: 30,
    days: [],
    createdAt: new Date().toISOString(),
  },
];

export function CohesionProvider({ children }: { children: React.ReactNode }) {
  const [cohesions, setCohesions] = useState<CohesionType[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load cohesions from localStorage
    const storedCohesions = localStorage.getItem("hug-mind-self-cohesion");
    if (storedCohesions) {
      setCohesions(JSON.parse(storedCohesions));
    } else {
      setCohesions(defaultCohesions);
      localStorage.setItem("hug-mind-self-cohesion", JSON.stringify(defaultCohesions));
    }
  }, []);

  // Save cohesions to localStorage whenever they change
  useEffect(() => {
    if (cohesions.length > 0) {
      localStorage.setItem("hug-mind-self-cohesion", JSON.stringify(cohesions));
    }
  }, [cohesions]);

  const addCohesion = (cohesion: Omit<CohesionType, "id" | "createdAt" | "days">) => {
    const newCohesion: CohesionType = {
      ...cohesion,
      id: `cohesion-${Date.now()}`,
      days: [],
      createdAt: new Date().toISOString(),
    };
    
    setCohesions(prev => [...prev, newCohesion]);
    toast({
      title: "เพิ่มกิจกรรมสำเร็จ",
      description: `เพิ่ม "${cohesion.name}" แล้ว`,
    });
  };

  const updateCohesion = (id: string, cohesion: Partial<CohesionType>) => {
    setCohesions(prev => 
      prev.map(c => 
        c.id === id ? { ...c, ...cohesion } : c
      )
    );
    toast({
      title: "อัปเดตกิจกรรมสำเร็จ",
      description: "อัปเดตข้อมูลกิจกรรมแล้ว",
    });
  };

  const deleteCohesion = (id: string) => {
    const cohesionToDelete = cohesions.find(c => c.id === id);
    setCohesions(prev => prev.filter(c => c.id !== id));
    toast({
      title: "ลบกิจกรรมสำเร็จ",
      description: cohesionToDelete ? `ลบ "${cohesionToDelete.name}" แล้ว` : "ลบกิจกรรมแล้ว",
    });
  };

  const markDay = (cohesionId: string, date: string, completed: boolean, note?: string) => {
    setCohesions(prev => 
      prev.map(c => {
        if (c.id === cohesionId) {
          const existingDayIndex = c.days.findIndex(d => d.date === date);
          let newDays;
          
          if (existingDayIndex >= 0) {
            newDays = [...c.days];
            newDays[existingDayIndex] = { date, completed, note };
          } else {
            newDays = [...c.days, { date, completed, note }];
          }
          
          return { ...c, days: newDays };
        }
        return c;
      })
    );
  };

  const getCurrentStreak = (cohesionId: string): number => {
    const cohesion = cohesions.find(c => c.id === cohesionId);
    if (!cohesion) return 0;
    
    // Sort days by date
    const sortedDays = [...cohesion.days]
      .filter(day => day.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (sortedDays.length === 0) return 0;
    
    // Check if the most recent day is today or yesterday
    const mostRecentDate = new Date(sortedDays[0].date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (mostRecentDate.getTime() !== today.getTime() && 
        mostRecentDate.getTime() !== yesterday.getTime()) {
      return 0;
    }
    
    // Count consecutive days
    let streak = 1;
    for (let i = 0; i < sortedDays.length - 1; i++) {
      const currentDate = new Date(sortedDays[i].date);
      const previousDate = new Date(sortedDays[i + 1].date);
      
      // Calculate difference in days
      const diffTime = currentDate.getTime() - previousDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };

  const getLongestStreak = (cohesionId: string): number => {
    const cohesion = cohesions.find(c => c.id === cohesionId);
    if (!cohesion) return 0;
    
    // Sort days by date
    const sortedDays = [...cohesion.days]
      .filter(day => day.completed)
      .map(day => day.date)
      .sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    
    if (sortedDays.length === 0) return 0;
    
    let currentStreak = 1;
    let longestStreak = 1;
    
    for (let i = 1; i < sortedDays.length; i++) {
      const currentDate = new Date(sortedDays[i]);
      const previousDate = new Date(sortedDays[i - 1]);
      
      // Calculate difference in days
      const diffTime = currentDate.getTime() - previousDate.getTime();
      const diffDays = diffTime / (1000 * 60 * 60 * 24);
      
      if (diffDays === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else if (diffDays > 1) {
        currentStreak = 1;
      }
    }
    
    return longestStreak;
  };

  const getCompletionRate = (cohesionId: string): number => {
    const cohesion = cohesions.find(c => c.id === cohesionId);
    if (!cohesion) return 0;
    
    const completedDays = cohesion.days.filter(day => day.completed).length;
    const totalDays = cohesion.days.length;
    
    return totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
  };

  return (
    <CohesionContext.Provider
      value={{
        cohesions,
        addCohesion,
        updateCohesion,
        deleteCohesion,
        markDay,
        getCurrentStreak,
        getLongestStreak,
        getCompletionRate,
      }}
    >
      {children}
    </CohesionContext.Provider>
  );
}

export function useCohesion() {
  const context = useContext(CohesionContext);
  if (context === undefined) {
    throw new Error("useCohesion must be used within a CohesionProvider");
  }
  return context;
}
