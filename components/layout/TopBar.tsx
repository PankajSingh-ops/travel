"use client";

import React from "react";
import { Search, Bell, Plus, HelpCircle, ChevronDown, Menu } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { useSidebar } from "../../lib/sidebar-context";
import { useLeads } from "../../lib/leads-store";

export function TopBar() {
  const { toggleMobile } = useSidebar();
  const { openNewLeadModal } = useLeads();

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-3 sm:px-6 gap-2 sm:gap-4 z-30">
      <div className="flex flex-1 items-center gap-2 sm:gap-4 min-w-0">
        {/* Mobile Hamburger Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMobile}
          className="lg:hidden shrink-0 text-muted-foreground hover:text-foreground"
          aria-label="Open sidebar menu"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search Bar */}
        <div className="relative w-full max-w-xs sm:max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="w-full bg-muted/50 pl-9 pr-2 text-xs sm:text-sm border-transparent focus-visible:bg-background h-9"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* WhatsApp status badge - compact on mobile */}
        <div className="hidden sm:flex items-center gap-2 border-r pr-3">
          <div className="flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success"></span>
            </span>
            <span className="hidden md:inline">WhatsApp Connected</span>
            <span className="md:hidden">WA Connected</span>
          </div>
        </div>

        <Button variant="ghost" size="icon" className="hidden sm:inline-flex h-9 w-9 text-muted-foreground">
          <HelpCircle className="h-4 w-4" />
        </Button>
        
        <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 flex h-2 w-2 rounded-full bg-destructive"></span>
        </Button>

        <Button size="sm" onClick={openNewLeadModal} className="gap-1 rounded-full shadow-xs px-2.5 sm:px-4 h-8 sm:h-9">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline text-xs sm:text-sm">Create</span>
        </Button>

        <div className="flex items-center gap-1.5 sm:gap-2 pl-1 sm:pl-2">
          <Avatar 
            src="https://i.pravatar.cc/150?u=rahul" 
            alt="User avatar" 
            fallback="RS" 
            className="h-8 w-8 cursor-pointer ring-2 ring-transparent transition-all hover:ring-primary"
          />
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-semibold leading-tight">Rahul Sharma</span>
            <span className="text-[10px] text-muted-foreground">Skyline Travels</span>
          </div>
          <ChevronDown className="hidden sm:inline-block h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
