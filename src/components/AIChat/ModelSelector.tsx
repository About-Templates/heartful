
import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { AIModel, useAIChat } from "@/contexts/AIChatContext";

const models = [
  {
    value: "gpt-4o",
    label: "GPT-4o (OpenAI)",
    provider: "openai"
  },
  {
    value: "claude-3-opus",
    label: "Claude 3 Opus",
    provider: "anthropic"
  },
  {
    value: "gemini-1.5-pro",
    label: "Gemini 1.5 Pro",
    provider: "google"
  },
  {
    value: "grok-1",
    label: "Grok-1",
    provider: "xai"
  },
  {
    value: "deepseek-coder",
    label: "DeepSeek Coder",
    provider: "deepseek"
  },
  {
    value: "qwen-72b",
    label: "Qwen 72B",
    provider: "qwen"
  },
];

export const ModelSelector = () => {
  const { selectedModel, setSelectedModel, apiKeys } = useAIChat();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between text-xs"
        >
          {selectedModel ? models.find((model) => model.value === selectedModel)?.label : "Select model..."}
          <ChevronsUpDown className="ml-2 h-3 w-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="ค้นหาโมเดล..." />
          <CommandEmpty>ไม่พบโมเดล</CommandEmpty>
          <CommandGroup>
            {models.map((model) => {
              const hasApiKey = Boolean(apiKeys[model.provider as keyof typeof apiKeys]);
              
              return (
                <CommandItem
                  key={model.value}
                  value={model.value}
                  onSelect={() => {
                    setSelectedModel(model.value as AIModel);
                    setOpen(false);
                  }}
                  disabled={!hasApiKey}
                  className={cn(
                    !hasApiKey && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedModel === model.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {model.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
