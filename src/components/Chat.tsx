"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMessage } from "./UserMessage";
import { BotMessage } from "./BotMessage";
import { getAIResponse } from "@/app/actions";
import { useLanguage } from "./LanguageProvider";

type Message = {
  id: number;
  role: "user" | "bot";
  content: string;
};

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now(), role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await getAIResponse(input, language);
      const botMessage: Message = { id: Date.now() + 1, role: "bot", content: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: "Sorry, I'm having trouble connecting. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full max-h-[calc(100svh-4rem)] md:max-h-full">
      <div
        ref={scrollAreaRef}
        className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-foreground/60">
            <h2 className="text-2xl font-bold font-headline">Welcome to Arogya AI</h2>
            <p className="max-w-md">
              Ask me any health-related question. I can provide information about symptoms, prevention, and more.
            </p>
            <p className="text-xs mt-4">For example: "What are the symptoms of dengue?"</p>
          </div>
        ) : (
          messages.map((message) =>
            message.role === "user" ? (
              <UserMessage key={message.id}>{message.content}</UserMessage>
            ) : (
              <BotMessage key={message.id}>{message.content}</BotMessage>
            )
          )
        )}
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-foreground/60">
             <LoaderCircle className="w-5 h-5 animate-spin text-primary" />
             <span>Arogya AI is thinking...</span>
          </div>
        )}
      </div>
      <div className="p-4 bg-background/80 backdrop-blur-sm border-t">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a health question..."
            className="flex-1"
            disabled={isLoading}
            aria-label="Chat input"
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()} variant="default" className="bg-primary hover:bg-primary/90">
            <SendHorizonal className="w-5 h-5" />
            <span className="sr-only">Send Message</span>
          </Button>
        </form>
         <p className="text-xs text-center text-foreground/50 mt-2">
            Arogya Mitra is an AI assistant and may produce inaccurate information. Consult a medical professional for advice.
        </p>
      </div>
    </div>
  );
}
