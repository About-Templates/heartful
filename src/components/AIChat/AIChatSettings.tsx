
import React from "react";
import { useAIChat } from "@/contexts/AIChatContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyeIcon, EyeOffIcon, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AIChatSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const apiProviders = [
  {
    id: "openai",
    name: "OpenAI",
    description: "สำหรับ GPT-4o และโมเดลอื่น ๆ จาก OpenAI",
    placeholder: "sk-..."
  },
  {
    id: "anthropic",
    name: "Anthropic",
    description: "สำหรับ Claude 3 และโมเดลอื่น ๆ จาก Anthropic",
    placeholder: "sk-ant-..."
  },
  {
    id: "google",
    name: "Google AI",
    description: "สำหรับ Gemini 1.5 และโมเดลอื่น ๆ จาก Google",
    placeholder: "AIzaSy..."
  },
  {
    id: "xai",
    name: "xAI",
    description: "สำหรับ Grok และโมเดลอื่น ๆ จาก xAI",
    placeholder: "grok-..."
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    description: "สำหรับ DeepSeek Coder และโมเดลอื่น ๆ จาก DeepSeek",
    placeholder: "dsk-..."
  },
  {
    id: "qwen",
    name: "Qwen",
    description: "สำหรับ Qwen และโมเดลอื่น ๆ จาก Alibaba Cloud",
    placeholder: "qw-..."
  }
];

export const AIChatSettings = ({ isOpen, onClose }: AIChatSettingsProps) => {
  const { apiKeys, setApiKey } = useAIChat();
  const [showKeys, setShowKeys] = React.useState<Record<string, boolean>>({});
  const [tempKeys, setTempKeys] = React.useState<Record<string, string>>({});
  
  React.useEffect(() => {
    // Initialize temp keys with existing API keys
    const keys: Record<string, string> = {};
    const safeApiKeys = apiKeys || {};
    
    for (const provider of apiProviders) {
      keys[provider.id] = safeApiKeys[provider.id as keyof typeof safeApiKeys] || "";
    }
    setTempKeys(keys);
  }, [apiKeys, isOpen]);
  
  const handleToggleShowKey = (provider: string) => {
    setShowKeys(prev => ({
      ...prev,
      [provider]: !prev[provider]
    }));
  };
  
  const handleSaveKey = (provider: string) => {
    setApiKey(provider as keyof typeof apiKeys, tempKeys[provider]);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>ตั้งค่า AI Chat</DialogTitle>
          <DialogDescription>
            เพิ่ม API keys สำหรับใช้งานกับโมเดล AI ต่าง ๆ
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="openai">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="openai">OpenAI</TabsTrigger>
            <TabsTrigger value="anthropic">Anthropic</TabsTrigger>
            <TabsTrigger value="others">อื่น ๆ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="openai">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="openai-key">OpenAI API Key</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleShowKey("openai")}
                  >
                    {showKeys.openai ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="openai-key"
                    type={showKeys.openai ? "text" : "password"}
                    value={tempKeys.openai || ""}
                    onChange={(e) => setTempKeys({ ...tempKeys, openai: e.target.value })}
                    placeholder="sk-..."
                  />
                  <Button onClick={() => handleSaveKey("openai")}>บันทึก</Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  สำหรับ GPT-4o และโมเดลอื่น ๆ จาก OpenAI
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="anthropic">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label htmlFor="anthropic-key">Anthropic API Key</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleToggleShowKey("anthropic")}
                  >
                    {showKeys.anthropic ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Input
                    id="anthropic-key"
                    type={showKeys.anthropic ? "text" : "password"}
                    value={tempKeys.anthropic || ""}
                    onChange={(e) => setTempKeys({ ...tempKeys, anthropic: e.target.value })}
                    placeholder="sk-ant-..."
                  />
                  <Button onClick={() => handleSaveKey("anthropic")}>บันทึก</Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  สำหรับ Claude 3 และโมเดลอื่น ๆ จาก Anthropic
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="others">
            <div className="space-y-6">
              {apiProviders.slice(2).map(provider => (
                <div key={provider.id}>
                  <div className="flex justify-between items-center mb-2">
                    <Label htmlFor={`${provider.id}-key`}>{provider.name} API Key</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleShowKey(provider.id)}
                    >
                      {showKeys[provider.id] ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      id={`${provider.id}-key`}
                      type={showKeys[provider.id] ? "text" : "password"}
                      value={tempKeys[provider.id] || ""}
                      onChange={(e) => setTempKeys({ ...tempKeys, [provider.id]: e.target.value })}
                      placeholder={provider.placeholder}
                    />
                    <Button onClick={() => handleSaveKey(provider.id)}>บันทึก</Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {provider.description}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
