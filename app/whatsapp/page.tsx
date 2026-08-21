"use client";

import React, { useState } from "react";
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Smile, 
  Mic, 
  Send, 
  FileText, 
  User, 
  CheckCheck, 
  Sparkles,
  ArrowLeft,
  Info,
  X
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WHATSAPP_MESSAGES } from "@/lib/mock-data";

export default function WhatsAppInbox() {
  const [activeChat, setActiveChat] = useState(WHATSAPP_MESSAGES[0]);
  const [mobileView, setMobileView] = useState<"list" | "chat">("list");
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChats = WHATSAPP_MESSAGES.filter(chat =>
    chat.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chat.phone.includes(searchTerm) ||
    chat.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChat = (chat: typeof WHATSAPP_MESSAGES[0]) => {
    setActiveChat(chat);
    setMobileView("chat");
  };

  return (
    <div className="relative flex h-[calc(100vh-4rem)] w-full overflow-hidden">
      {/* LEFT COLUMN: Chat List (Visible on desktop OR when mobileView is 'list') */}
      <div 
        className={`w-full lg:w-[340px] xl:w-[360px] shrink-0 border-r bg-background flex flex-col ${
          mobileView === "chat" ? "hidden lg:flex" : "flex"
        }`}
      >
        <div className="p-3 sm:p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-primary">Inbox</h2>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-success mr-1.5 animate-pulse"></span>
              Connected
            </Badge>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search chats..." 
              className="pl-8 bg-muted/50 text-xs sm:text-sm h-9" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-border/40">
          {filteredChats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => handleSelectChat(chat)}
              className={`flex items-start gap-3 p-3 sm:p-4 cursor-pointer transition-colors hover:bg-muted/50 ${
                activeChat.id === chat.id ? 'bg-muted/70' : ''
              }`}
            >
              <Avatar fallback={chat.customerName.substring(0, 2).toUpperCase()} className="h-10 w-10 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs sm:text-sm truncate">{chat.customerName}</h4>
                  <span className="text-[11px] text-muted-foreground shrink-0">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground truncate flex-1 pr-2">{chat.lastMessage}</p>
                  {chat.unreadCount > 0 && (
                    <span className="flex h-4.5 min-w-4.5 px-1 items-center justify-center rounded-full bg-success text-[10px] font-medium text-white shrink-0">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
                <div className="mt-1.5 flex items-center gap-1.5">
                  {chat.leadStatus === "HOT" && <Badge variant="destructive" className="text-[9px] px-1.5 py-0">HOT</Badge>}
                  {chat.leadStatus === "WARM" && <Badge variant="warning" className="text-[9px] px-1.5 py-0">WARM</Badge>}
                  <span className="text-[11px] text-muted-foreground ml-auto">{chat.destination}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER COLUMN: Chat Interface (Visible on desktop OR when mobileView is 'chat') */}
      <div 
        className={`flex-1 flex flex-col min-w-0 bg-[#EFEAE2] dark:bg-[#0B141A] ${
          mobileView === "list" ? "hidden lg:flex" : "flex"
        }`}
      >
        {/* Chat Header */}
        <div className="h-16 border-b bg-background flex items-center justify-between px-3 sm:px-4 shrink-0 shadow-xs z-10">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* Back to List on mobile */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden h-8 w-8 shrink-0 text-muted-foreground"
              onClick={() => setMobileView("list")}
              aria-label="Back to chats"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            
            <Avatar fallback={activeChat.customerName.substring(0, 2).toUpperCase()} className="h-9 w-9 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-semibold text-xs sm:text-sm truncate">{activeChat.customerName}</h3>
              <p className="text-[11px] text-muted-foreground truncate">{activeChat.phone} &middot; {activeChat.destination}</p>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 text-muted-foreground shrink-0">
            <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:inline-flex"><Phone className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hidden sm:inline-flex"><Video className="h-4 w-4" /></Button>
            {/* Toggle Info Panel */}
            <Button 
              variant={showMobileInfo ? "secondary" : "ghost"} 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setShowMobileInfo(!showMobileInfo)}
              title="Toggle opportunity details"
            >
              <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><MoreVertical className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 relative">
          {activeChat.messages.map((msg, i) => {
            if (msg.type === "info") {
              return (
                <div key={i} className="flex justify-center my-3">
                  <div className="bg-amber-100/90 dark:bg-amber-950/50 text-amber-900 dark:text-amber-200 text-[11px] sm:text-xs py-1 px-3 rounded-md shadow-xs text-center max-w-[90%]">
                    {msg.text} &middot; {msg.time}
                  </div>
                </div>
              );
            }
            
            const isUser = msg.type === "user";
            return (
              <div key={i} className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[85%] sm:max-w-[70%] rounded-lg p-2.5 shadow-xs relative ${
                  isUser 
                    ? "bg-card text-card-foreground rounded-tl-none border" 
                    : "bg-[#d9fdd3] dark:bg-[#005c4b] text-foreground rounded-tr-none"
                }`}>
                  <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                  <div className="flex items-center justify-end mt-1 space-x-1">
                    <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                    {!isUser && <CheckCheck className="h-3 w-3 text-[#53bdeb]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input Bar */}
        <div className="h-16 bg-background border-t flex items-center px-2 sm:px-4 gap-1 sm:gap-2 shrink-0">
          <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0 h-8 w-8 sm:h-9 sm:w-9">
            <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0 h-8 w-8 sm:h-9 sm:w-9">
            <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <Input 
            placeholder="Type a message..." 
            className="flex-1 rounded-full bg-muted/50 border-transparent focus-visible:bg-background text-xs sm:text-sm h-9" 
          />
          <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-muted-foreground shrink-0 h-9 w-9">
            <Mic className="h-4 w-4" />
          </Button>
          <Button size="icon" className="rounded-full shrink-0 h-8 w-8 sm:h-9 sm:w-9">
            <Send className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-0.5" />
          </Button>
        </div>
      </div>

      {/* RIGHT COLUMN: Customer Opportunity & AI panel */}
      {/* On desktop: visible when xl or when showMobileInfo is true. On mobile: slide-over drawer when showMobileInfo is true */}
      <div 
        className={`w-full sm:w-[320px] shrink-0 border-l bg-background flex flex-col overflow-y-auto z-20 ${
          showMobileInfo 
            ? "fixed inset-y-0 right-0 z-50 sm:static shadow-2xl sm:shadow-none flex" 
            : "hidden xl:flex"
        }`}
      >
        <div className="p-4 sm:p-6 flex flex-col items-center border-b relative">
          {/* Close button for mobile info drawer */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="xl:hidden absolute right-3 top-3 h-8 w-8 text-muted-foreground"
            onClick={() => setShowMobileInfo(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          <Avatar fallback={activeChat.customerName.substring(0, 2).toUpperCase()} className="h-16 w-16 sm:h-20 sm:w-20 mb-3" />
          <h3 className="font-semibold text-base sm:text-lg text-center">{activeChat.customerName}</h3>
          <p className="text-xs text-muted-foreground">{activeChat.phone}</p>
          <div className="flex space-x-2 mt-4 w-full">
            <Button variant="outline" size="sm" className="flex-1 text-xs h-8">
              <User className="mr-1 h-3.5 w-3.5" /> Profile
            </Button>
            <Button variant="default" size="sm" className="flex-1 text-xs h-8">
              <FileText className="mr-1 h-3.5 w-3.5" /> Quote
            </Button>
          </div>
        </div>

        {/* AI Summary Panel */}
        <div className="p-4 border-b bg-purple-50/50 dark:bg-purple-950/20">
          <div className="flex items-center space-x-2 mb-2 text-purple-700 dark:text-purple-300">
            <Sparkles className="h-4 w-4" />
            <h4 className="font-semibold text-xs sm:text-sm">AI Copilot Summary</h4>
          </div>
          <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
            Customer interested in {activeChat.destination} tour. High booking intent. Needs customized itinerary with hotel options.
          </p>
          <div className="space-y-1.5 mb-3 bg-background/60 p-2 rounded-md">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Destination</span>
              <span className="font-medium">{activeChat.destination}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Potential Value</span>
              <span className="font-medium text-success">₹{(activeChat.potentialValue).toLocaleString('en-IN')}</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full text-xs text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:bg-purple-100/50 h-8">
            Generate Itinerary
          </Button>
        </div>

        {/* Deal Info */}
        <div className="p-4">
          <h4 className="font-semibold text-xs mb-3 text-muted-foreground uppercase tracking-wider">Active Opportunity</h4>
          <div className="space-y-3">
            <div>
              <div className="text-[11px] text-muted-foreground mb-1">Stage</div>
              <Badge variant={activeChat.leadStatus === "HOT" ? "warning" : "secondary"} className="text-xs">
                {activeChat.leadStatus === "HOT" ? "Negotiation" : "New"}
              </Badge>
            </div>
            <div>
              <div className="text-[11px] text-muted-foreground mb-0.5">Assigned Agent</div>
              <div className="flex items-center space-x-2 mt-1">
                <Avatar fallback={activeChat.assignedTo.substring(0, 1)} className="h-5 w-5 text-[10px]" />
                <span className="text-xs font-medium">{activeChat.assignedTo}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
