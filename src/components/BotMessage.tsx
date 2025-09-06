import { Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

type BotMessageProps = {
  children: React.ReactNode;
};

export function BotMessage({ children }: BotMessageProps) {
  return (
    <div className="flex items-start gap-3">
      <Avatar className="w-8 h-8 border-2 border-primary/50">
        <AvatarFallback className="bg-primary/20 text-primary">
          <Bot className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      <div className="max-w-lg w-fit">
         <Card className="bg-card text-card-foreground shadow-md rounded-2xl rounded-tl-none">
            <CardContent className="p-3">
                <p className="text-sm">{children}</p>
            </CardContent>
         </Card>
      </div>
    </div>
  );
}
