
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

export const AIChatProvider = ({ children }: AIChatProviderProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
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
    setMessages([]);
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
      
      // TODO: Implement the actual API call based on the selected model
      // This is a mock response for now
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: `This is a mock response from ${selectedModel}. API integration will be implemented based on your requirements.`,
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
