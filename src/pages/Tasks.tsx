
import { useState } from "react";
import { useTasks } from "@/contexts/TasksContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle, Plus, Clock, Trash2 } from "lucide-react";

const Tasks = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTaskTitle.trim()) {
      addTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-8 px-6 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">งานของฉัน</h1>
            <p className="text-gray-600">
              จัดการงานและติดตามความคืบหน้าของคุณ
            </p>
          </div>
          
          {/* Add new task form */}
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-medium flex items-center">
                <Plus className="mr-2 h-5 w-5 text-theme-purple" />
                เพิ่มงานใหม่
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="พิมพ์งานของคุณที่นี่..."
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  className="bg-theme-purple hover:bg-theme-purple-dark"
                  disabled={!newTaskTitle.trim()}
                >
                  เพิ่ม
                </Button>
              </form>
            </CardContent>
          </Card>
          
          {/* Tasks list */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-theme-purple" />
              งานทั้งหมด ({tasks.length})
            </h2>
            
            {tasks.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                <p className="text-gray-500">ยังไม่มีงาน เพิ่มงานแรกของคุณ</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className={`bg-white rounded-lg border p-4 flex items-center justify-between ${
                      task.completed ? "border-green-200 bg-green-50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id={`task-${task.id}`}
                        checked={task.completed}
                        onCheckedChange={() => toggleTask(task.id)}
                        className="h-5 w-5 border-gray-300"
                      />
                      <label 
                        htmlFor={`task-${task.id}`}
                        className={`${task.completed ? "line-through text-gray-400" : ""}`}
                      >
                        {task.title}
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(task.createdAt).toLocaleDateString('th-TH')}
                      </span>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteTask(task.id)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Tasks;
