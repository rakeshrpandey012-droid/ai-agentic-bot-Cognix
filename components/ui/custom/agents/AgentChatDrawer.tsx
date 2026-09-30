import React, { useState, useContext, useRef, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { UserDetailContext } from "@/context/UserDetailContext";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Send, Loader2, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  role: "user" | "agent";
  content: string;
};

type AgentChatDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  agentId: string;
};

export const AgentChatDrawer = ({ isOpen, onClose, agentId }: AgentChatDrawerProps) => {
  const { userDetail } = useContext(UserDetailContext) as any;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // reset messages when opening a new agent chat
  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      setInput("");
    }
  }, [isOpen, agentId]);

  const handleSend = async () => {
    if (!input.trim() || !userDetail?.id || !agentId) return;
    
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await axios.post("/api/agent/execute", {
        agentId,
        userId: userDetail.id,
        input: userMessage.content,
      });
      
      const agentMessage: Message = { role: "agent", content: res.data.result || "No response" };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error: any) {
      console.error(error);
      setMessages((prev) => [...prev, { role: "agent", content: "Error executing agent." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md flex flex-col h-full p-0">
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Agent Chat</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-muted-foreground mt-10">
              Start chatting with the agent...
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'agent' && (
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <Bot className="h-4 w-4 text-blue-700" />
                  </div>
                )}
                <div className={`p-3 rounded-lg max-w-[80%] overflow-hidden ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {msg.role === 'user' ? (
                    <div className="text-sm whitespace-pre-wrap">{msg.content}</div>
                  ) : (
                    <div className="text-sm prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  )}
                </div>
                {msg.role === 'user' && (
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <Bot className="h-4 w-4 text-blue-700" />
              </div>
              <div className="p-3 rounded-lg bg-muted flex items-center">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t mt-auto">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="flex gap-2"
          >
            <Input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <Button type="submit" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};
