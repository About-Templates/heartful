
import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

export type TaskType = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt: string;
};

type TasksContextType = {
  tasks: TaskType[];
  addTask: (task: Omit<TaskType, "id" | "createdAt" | "completed">) => void;
  updateTask: (id: string, task: Partial<TaskType>) => void;
  deleteTask: (id: string) => void;
  toggleComplete: (id: string) => void;
};

const TasksContext = createContext<TasksContextType | undefined>(undefined);

const defaultTasks: TaskType[] = [
  {
    id: "1",
    title: "ฝึกสมาธิ 10 นาที",
    description: "ฝึกสมาธิเพื่อผ่อนคลายจิตใจและเพิ่มสมาธิ",
    completed: false,
    priority: "high",
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "อ่านหนังสือ",
    description: "อ่านหนังสือที่สนใจอย่างน้อย 30 นาที",
    completed: false,
    priority: "medium",
    dueDate: new Date().toISOString(),
    createdAt: new Date().toISOString(),
  },
];

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load tasks from localStorage
    const storedTasks = localStorage.getItem("hug-mind-self-tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      setTasks(defaultTasks);
      localStorage.setItem("hug-mind-self-tasks", JSON.stringify(defaultTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("hug-mind-self-tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task: Omit<TaskType, "id" | "createdAt" | "completed">) => {
    const newTask: TaskType = {
      ...task,
      id: `task-${Date.now()}`,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTasks(prev => [...prev, newTask]);
    toast({
      title: "เพิ่มงานสำเร็จ",
      description: `เพิ่ม "${task.title}" แล้ว`,
    });
  };

  const updateTask = (id: string, task: Partial<TaskType>) => {
    setTasks(prev => 
      prev.map(t => 
        t.id === id ? { ...t, ...task } : t
      )
    );
    toast({
      title: "อัปเดตงานสำเร็จ",
      description: "อัปเดตข้อมูลงานแล้ว",
    });
  };

  const deleteTask = (id: string) => {
    const taskToDelete = tasks.find(t => t.id === id);
    setTasks(prev => prev.filter(t => t.id !== id));
    toast({
      title: "ลบงานสำเร็จ",
      description: taskToDelete ? `ลบ "${taskToDelete.title}" แล้ว` : "ลบงานแล้ว",
    });
  };

  const toggleComplete = (id: string) => {
    setTasks(prev => 
      prev.map(t => {
        if (t.id === id) {
          const completed = !t.completed;
          toast({
            title: completed ? "ทำเสร็จแล้ว" : "ยังไม่เสร็จ",
            description: `${t.title} ${completed ? "✓" : "✗"}`,
          });
          return { ...t, completed };
        }
        return t;
      })
    );
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleComplete,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
}
