import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarTrigger,
  SidebarContent,
  SidebarInset,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { ArogyaIcon } from "@/components/ArogyaIcon";
import { HealthTopics } from "@/components/HealthTopics";
import { PublicHealthAlerts } from "@/components/PublicHealthAlerts";
import { LanguageSelector } from "@/components/LanguageSelector";
import { Chat } from "@/components/Chat";

export default function Home() {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <ArogyaIcon className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-headline font-semibold">Arogya AI</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <HealthTopics />
          <PublicHealthAlerts />
        </SidebarContent>
        <SidebarFooter>
          <LanguageSelector />
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex items-center justify-between p-2 border-b md:hidden">
          <div className="flex items-center gap-2">
            <ArogyaIcon className="w-8 h-8 text-primary" />
            <h1 className="text-xl font-headline font-semibold">Arogya AI</h1>
          </div>
          <SidebarTrigger />
        </header>
        <div className="flex-1 overflow-y-auto">
          <Chat />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
