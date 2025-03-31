
import React, { useState, useRef, useEffect } from "react";
import { Send, Settings, X, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAIChat } from "@/contexts/AIChatContext";
import { ModelSelector } from "./ModelSelector";
import { AIChatSettings } from "./AIChatSettings";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";

export const AIChat = () => {
  const {
    messages,
    isOpen,
    isLoading,
    sendMessage,
    toggleChat,
    clearMessages
  } = useAIChat();
  const [input, setInput] = useState("");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-20 md:bottom-6 right-6 rounded-full shadow-lg h-14 w-14 p-0 flex items-center justify-center bg-theme-purple hover:bg-theme-purple-dark z-50"
      >
        <MessageCircle size={24} />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-20 md:bottom-6 right-6 w-[350px] md:w-[400px] h-[500px] rounded-lg shadow-xl bg-background border border-border z-50 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b flex justify-between items-center bg-muted/50">
        <div className="font-medium">AI Chat</div>
        <div className="flex space-x-2">
          <ModelSelector />
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSettingsOpen(true)}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleChat}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-muted-foreground h-full flex items-center justify-center">
            <p>ส่งข้อความเพื่อเริ่มการสนทนากับ AI</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "max-w-[85%] rounded-lg p-3",
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-muted"
              )}
            >
              <ReactMarkdown className="prose dark:prose-invert prose-sm max-w-none">
                {message.content}
              </ReactMarkdown>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <div className="p-3 border-t">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="พิมพ์ข้อความ..."
            className="min-h-[60px] max-h-[120px]"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="h-full"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
      </div>
      
      {/* Settings Dialog */}
      <AIChatSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};
