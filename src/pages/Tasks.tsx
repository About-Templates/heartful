
import React, { useState } from "react";
import { useTasks, TaskType } from "@/contexts/TasksContext";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Trash2, Plus } from "lucide-react";

const Tasks = () => {
  const { tasks, addTask, updateTask, deleteTask, toggleTask } = useTasks();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

  const handleAddTask = () => {
    if (title.trim()) {
      addTask({
        title,
        description,
        priority
      });
      setTitle("");
      setDescription("");
      setPriority("medium");
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto p-4 max-w-4xl">
        <h1 className="text-2xl font-bold mb-6">จัดการงานของคุณ</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>เพิ่มงานใหม่</CardTitle>
            <CardDescription>เพิ่มงานที่คุณต้องการทำ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Input
                placeholder="ชื่องาน"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <Input
                placeholder="คำอธิบาย (ไม่จำเป็น)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Select value={priority} onValueChange={(value: "low" | "medium" | "high") => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="ความสำคัญ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">ต่ำ</SelectItem>
                  <SelectItem value="medium">ปานกลาง</SelectItem>
                  <SelectItem value="high">สูง</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleAddTask} className="w-full">
              <Plus className="mr-2 h-4 w-4" /> เพิ่มงาน
            </Button>
          </CardFooter>
        </Card>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">รายการงาน</h2>
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center p-8">ยังไม่มีงาน คลิกที่ "เพิ่มงาน" เพื่อเริ่มต้น</p>
          ) : (
            tasks.map((task) => (
              <Card key={task.id} className={`border-l-4 ${getPriorityColor(task.priority)}`}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                      />
                      <label
                        htmlFor={`task-${task.id}`}
                        className={`font-medium ${task.completed ? "line-through text-gray-500" : ""}`}
                      >
                        {task.title}
                      </label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="h-8 w-8 p-0 text-gray-500 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                {task.description && (
                  <CardContent className="py-0">
                    <p className={`text-sm text-gray-600 ${task.completed ? "line-through text-gray-400" : ""}`}>
                      {task.description}
                    </p>
                  </CardContent>
                )}
                <CardFooter className="pt-2 pb-2 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>สร้างเมื่อ {formatDate(task.createdAt)}</span>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </MainLayout>
  );
};

const getPriorityColor = (priority: "low" | "medium" | "high") => {
  switch (priority) {
    case "high":
      return "border-red-500";
    case "medium":
      return "border-yellow-500";
    case "low":
      return "border-green-500";
    default:
      return "border-gray-300";
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export default Tasks;
