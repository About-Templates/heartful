
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "@/hooks/use-toast";

// Define model options
export type AIModel = 
  | "grok-1" 
  | "gemini-1.5-pro" 
  | "deepseek-coder" 
  | "qwen-72b" 
  | "gpt-4o" 
  | "claude-3-opus";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

interface APIKeys {
  openai?: string;
  anthropic?: string;
  google?: string;
  xai?: string;
  deepseek?: string;
  qwen?: string;
}

interface AIChatContextType {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  selectedModel: AIModel;
  apiKeys: APIKeys;
  setApiKey: (provider: keyof APIKeys, key: string) => void;
  setSelectedModel: (model: AIModel) => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  toggleChat: () => void;
}

const AIChatContext = createContext<AIChatContextType | undefined>(undefined);

export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if (!context) {
    throw new Error("useAIChat must be used within an AIChatProvider");
  }
  return context;
};

interface AIChatProviderProps {
  children: ReactNode;
}

// Psychologist therapist system message
const therapistSystemMessage = `คุณคือผู้ช่วยที่เป็นนักจิตวิทยาที่มีความเชี่ยวชาญในการให้คำปรึกษาด้านสุขภาพจิต คุณมีหน้าที่:
1. รับฟังปัญหาและให้คำแนะนำเกี่ยวกับสุขภาพจิตอย่างเอาใจใส่
2. ส่งเสริมการดูแลสุขภาพจิตและการพัฒนาตนเอง
3. สนับสนุนผู้ใช้ในการจัดการกับความเครียด ความวิตกกังวล และสภาวะทางจิตอื่นๆ
4. ให้คำแนะนำเกี่ยวกับเทคนิคการจัดการความเครียดและการดูแลสุขภาพจิต
5. แนะนำแนวทางการสร้างความสมดุลในชีวิต การพักผ่อน และการดูแลตนเอง

คุณไม่ใช่นักจิตวิทยาที่มีใบอนุญาตและควรแนะนำให้ผู้ใช้ปรึกษาผู้เชี่ยวชาญด้านสุขภาพจิตในกรณีที่มีความกังวลรุนแรง
ใช้ภาษาที่อ่อนโยน เข้าใจง่าย และเป็นมิตร ให้กำลังใจ และสร้างความหวังให้กับผู้ใช้เสมอ`;

export const AIChatProvider = ({ children }: AIChatProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "system-1",
      role: "system",
      content: therapistSystemMessage,
      timestamp: Date.now()
    }
  ]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedModel, setSelectedModel] = useState<AIModel>("gpt-4o");
  const [apiKeys, setApiKeys] = useLocalStorage<APIKeys>("ai-api-keys", {});

  const setApiKey = (provider: keyof APIKeys, key: string) => {
    setApiKeys(prev => ({
      ...prev,
      [provider]: key
    }));
    
    // Show confirmation toast
    toast({
      title: "API Key บันทึกแล้ว",
      description: `คีย์ API สำหรับ ${provider} ได้รับการบันทึกเรียบร้อยแล้ว`,
      variant: "default"
    });
  };

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  const clearMessages = () => {
    setMessages([
      {
        id: "system-1",
        role: "system",
        content: therapistSystemMessage,
        timestamp: Date.now()
      }
    ]);
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: Date.now()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Check if API key exists for the selected model
      const requiredProvider = getProviderForModel(selectedModel);
      const safeApiKeys = apiKeys || {};
      
      if (!safeApiKeys[requiredProvider]) {
        throw new Error(`API key for ${requiredProvider} is required for ${selectedModel}`);
      }
      
      // Mock response for now - this would be replaced with actual API call
      // Giving specialized mental health support responses
      setTimeout(() => {
        let response = "ขออภัย ฉันไม่สามารถเชื่อมต่อกับ API ได้ในขณะนี้ กรุณาลองอีกครั้งในภายหลัง";
        
        // Mock different responses based on keywords in user message
        if (content.toLowerCase().includes("เครียด") || content.toLowerCase().includes("stress")) {
          response = "ฉันเข้าใจว่าคุณกำลังรู้สึกเครียด เป็นเรื่องปกติที่เราทุกคนจะรู้สึกแบบนี้ได้ ลองหายใจลึกๆ และให้เวลากับตัวเองสักครู่ คุณอาจลองทำเทคนิคการหายใจ 4-7-8 โดยหายใจเข้า 4 วินาที กลั้นไว้ 7 วินาที และหายใจออก 8 วินาที ทำซ้ำประมาณ 5 รอบ นี่เป็นเทคนิคที่ช่วยลดความเครียดได้อย่างรวดเร็ว";
        } else if (content.toLowerCase().includes("นอน") || content.toLowerCase().includes("sleep")) {
          response = "การนอนหลับเป็นสิ่งสำคัญมากต่อสุขภาพจิต ถ้าคุณมีปัญหาเรื่องการนอน ลองกำหนดเวลาเข้านอนและตื่นนอนให้เป็นเวลาเดียวกันทุกวัน งดใช้อุปกรณ์อิเล็กทรอนิกส์ก่อนนอน 1 ชั่วโมง และสร้างบรรยากาศห้องนอนให้เงียบสงบ มืด และเย็นสบาย";
        } else if (content.toLowerCase().includes("วิตก") || content.toLowerCase().includes("กังวล") || content.toLowerCase().includes("anxiety")) {
          response = "ความวิตกกังวลเป็นสิ่งที่หลายคนเผชิญอยู่ ลองฝึกการอยู่กับปัจจุบัน สังเกตสิ่งที่อยู่รอบตัวคุณ 5 อย่างที่คุณเห็น 4 อย่างที่คุณสัมผัสได้ 3 อย่างที่คุณได้ยิน 2 อย่างที่คุณได้กลิ่น และ 1 อย่างที่คุณรู้รส นี่เป็นเทคนิคที่เรียกว่า 5-4-3-2-1 ซึ่งช่วยให้คุณกลับมาอยู่กับปัจจุบันและลดความวิตกกังวลลงได้";
        } else {
          response = "ขอบคุณที่แบ่งปันความรู้สึกของคุณกับฉัน การดูแลสุขภาพจิตเป็นสิ่งสำคัญ คุณอาจลองทำกิจกรรมที่ช่วยผ่อนคลาย เช่น การฝึกสติ การเดินในธรรมชาติ หรือทำกิจกรรมที่คุณชื่นชอบ อย่าลืมว่าการขอความช่วยเหลือเป็นสิ่งที่แสดงถึงความเข้มแข็ง ไม่ใช่ความอ่อนแอ";
        }
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response,
          timestamp: Date.now()
        };
        setMessages(prev => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 1000);
      
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  };

  // Helper function to determine which API key is needed for a model
  const getProviderForModel = (model: AIModel): keyof APIKeys => {
    switch(model) {
      case "gpt-4o":
        return "openai";
      case "claude-3-opus":
        return "anthropic";
      case "gemini-1.5-pro":
        return "google";
      case "grok-1":
        return "xai";
      case "deepseek-coder":
        return "deepseek";
      case "qwen-72b":
        return "qwen";
      default:
        return "openai";
    }
  };

  const value = {
    messages,
    isOpen,
    isLoading,
    selectedModel,
    apiKeys,
    setApiKey,
    setSelectedModel,
    sendMessage,
    clearMessages,
    toggleChat
  };

  return (
    <AIChatContext.Provider value={value}>
      {children}
    </AIChatContext.Provider>
  );
};
