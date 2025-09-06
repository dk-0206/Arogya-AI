import { User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserMessageProps = {
  children: React.ReactNode;
};

export function UserMessage({ children }: UserMessageProps) {
  return (
    <div className="flex justify-end items-start gap-3">
      <div className="max-w-lg w-fit">
        <div className="bg-primary text-primary-foreground p-3 rounded-2xl rounded-tr-none shadow-md">
          <p className="text-sm">{children}</p>
        </div>
      </div>
       <Avatar className="w-8 h-8">
        <AvatarFallback>
          <User className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
