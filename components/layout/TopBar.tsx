import React from "react";
import { Search, Bell, Plus, HelpCircle, ChevronDown } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";

export function TopBar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search customers, leads, bookings..." 
            className="w-full bg-muted/50 pl-9 border-transparent focus-visible:bg-background"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 border-r pr-4">
          <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
            </span>
            WhatsApp Connected
          </div>
        </div>

        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <HelpCircle className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon" className="relative text-muted-foreground">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-destructive"></span>
        </Button>

        <Button className="gap-1 rounded-full shadow-sm">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Create</span>
        </Button>

        <div className="flex items-center gap-2 pl-2">
          <Avatar 
            src="https://i.pravatar.cc/150?u=rahul" 
            alt="User avatar" 
            fallback="RS" 
            className="h-8 w-8 cursor-pointer ring-2 ring-transparent transition-all hover:ring-primary"
          />
          <div className="hidden flex-col sm:flex">
            <span className="text-sm font-medium leading-none">Rahul Sharma</span>
            <span className="text-xs text-muted-foreground">Skyline Travels</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
