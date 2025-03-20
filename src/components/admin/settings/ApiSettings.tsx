
import React, { useState } from "react";
import { Lock, Eye, EyeOff, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const ApiSettings = () => {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lock className="mr-2 h-5 w-5 text-red-500" />
          การตั้งค่า API
        </CardTitle>
        <CardDescription>
          จัดการคีย์ API และการเข้าถึง
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">API Key</h3>
            <p className="text-sm text-gray-500 mb-4">
              ใช้คีย์นี้เพื่อเข้าถึงระบบผ่าน API (โปรดเก็บคีย์นี้ไว้เป็นความลับ)
            </p>
            
            <div className="flex">
              <div className="relative flex-1">
                <Input 
                  type={showApiKey ? "text" : "password"} 
                  value="hms_api_12345678abcdefghijk" 
                  readOnly
                  className="pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <Button variant="outline" className="ml-2">
                คัดลอก
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">ขีดจำกัด API</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">จำนวนคำขอสูงสุดต่อนาที:</span>
                <Input 
                  type="number" 
                  defaultValue="60" 
                  className="w-24 text-right" 
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">จำนวนคำขอสูงสุดต่อวัน:</span>
                <Input 
                  type="number" 
                  defaultValue="10000" 
                  className="w-24 text-right" 
                />
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-2">Webhooks</h3>
            <div className="rounded-md border p-4">
              <div className="mb-4">
                <Label>URL สำหรับ Webhook</Label>
                <Input placeholder="https://your-webhook-url.com/api" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Switch id="event-user-signup" />
                  <Label htmlFor="event-user-signup" className="ml-2">
                    เหตุการณ์สมัครสมาชิก
                  </Label>
                </div>
                <div className="flex items-center">
                  <Switch id="event-task-complete" />
                  <Label htmlFor="event-task-complete" className="ml-2">
                    เหตุการณ์ทำภารกิจเสร็จ
                  </Label>
                </div>
                <div className="flex items-center">
                  <Switch id="event-cohesion-complete" />
                  <Label htmlFor="event-cohesion-complete" className="ml-2">
                    เหตุการณ์ทำกิจกรรมเสร็จ
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Save className="mr-2 h-4 w-4" />
          บันทึกการตั้งค่า API
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ApiSettings;
