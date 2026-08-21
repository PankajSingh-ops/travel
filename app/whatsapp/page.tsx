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
  Check,
  CheckCheck,
  Sparkles
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { WHATSAPP_MESSAGES } from "@/lib/mock-data";

export default function WhatsAppInbox() {
  const [activeChat, setActiveChat] = useState(WHATSAPP_MESSAGES[0]);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      {/* LEFT COLUMN: Chat List */}
      <div className="w-[350px] flex-shrink-0 border-r bg-background flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold tracking-tight">Inbox</h2>
            <div className="flex space-x-2">
              <Badge variant="outline" className="bg-success/10 text-success border-success/20">Connected</Badge>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search messages..." className="pl-8 bg-muted/50" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {WHATSAPP_MESSAGES.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`flex items-start gap-3 p-4 border-b cursor-pointer transition-colors hover:bg-muted/50 ${activeChat.id === chat.id ? 'bg-muted/80' : ''}`}
            >
              <Avatar fallback={chat.customerName.substring(0, 2).toUpperCase()} className="h-10 w-10 mt-1" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm truncate">{chat.customerName}</h4>
                  <span className="text-xs text-muted-foreground">{chat.time}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-muted-foreground truncate flex-1">{chat.lastMessage}</p>
                  {chat.unreadCount > 0 && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-success text-[10px] font-medium text-white">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
                <div className="mt-2 flex space-x-1">
                  {chat.leadStatus === "HOT" && <Badge variant="destructive" className="text-[9px] px-1.5 py-0">HOT</Badge>}
                  {chat.leadStatus === "WARM" && <Badge variant="warning" className="text-[9px] px-1.5 py-0">WARM</Badge>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CENTER COLUMN: Chat Interface */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#EFEAE2] dark:bg-[#0B141A]">
        {/* Chat Header */}
        <div className="h-16 border-b bg-background flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Avatar fallback={activeChat.customerName.substring(0, 2).toUpperCase()} className="h-10 w-10" />
            <div>
              <h3 className="font-semibold text-sm">{activeChat.customerName}</h3>
              <p className="text-xs text-muted-foreground">{activeChat.phone} &middot; Assigned: {activeChat.assignedTo}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><Search className="h-4 w-4" /></Button>
            <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 relative bg-[url('https://static.whatsapp.net/rsrc.php/v3/yl/r/r_Q_kO_Yg7l.png')] dark:bg-[url('https://static.whatsapp.net/rsrc.php/v3/yq/r/zT99nI5jJat.png')] bg-repeat opacity-95">
          {activeChat.messages.map((msg, i) => {
            if (msg.type === "info") {
              return (
                <div key={i} className="flex justify-center my-4">
                  <div className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs py-1 px-3 rounded-lg shadow-sm">
                    {msg.text} &middot; {msg.time}
                  </div>
                </div>
              );
            }
            
            const isUser = msg.type === "user";
            return (
              <div key={i} className={`flex ${isUser ? "justify-start" : "justify-end"}`}>
                <div className={`max-w-[70%] rounded-lg p-2.5 shadow-sm relative ${isUser ? "bg-card text-card-foreground rounded-tl-none" : "bg-[#d9fdd3] dark:bg-[#005c4b] text-foreground rounded-tr-none"}`}>
                  <p className="text-sm">{msg.text}</p>
                  <div className="flex items-center justify-end mt-1 space-x-1">
                    <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                    {!isUser && <CheckCheck className="h-3 w-3 text-[#53bdeb]" />}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chat Input */}
        <div className="h-16 bg-background flex items-center px-4 gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0"><Smile className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0"><Paperclip className="h-5 w-5" /></Button>
          <Input placeholder="Type a message" className="flex-1 rounded-full bg-muted/50 border-transparent focus-visible:bg-background" />
          <Button variant="ghost" size="icon" className="text-muted-foreground shrink-0"><Mic className="h-5 w-5" /></Button>
          <Button size="icon" className="rounded-full shrink-0 h-10 w-10"><Send className="h-4 w-4 ml-1" /></Button>
        </div>
      </div>

      {/* RIGHT COLUMN: Customer Info & AI */}
      <div className="w-[320px] flex-shrink-0 border-l bg-background flex flex-col overflow-y-auto">
        <div className="p-6 flex flex-col items-center border-b">
          <Avatar fallback={activeChat.customerName.substring(0, 2).toUpperCase()} className="h-24 w-24 mb-4" />
          <h3 className="font-semibold text-lg">{activeChat.customerName}</h3>
          <p className="text-sm text-muted-foreground">{activeChat.phone}</p>
          <div className="flex space-x-2 mt-4 w-full">
            <Button variant="outline" className="flex-1"><User className="mr-2 h-4 w-4" /> Profile</Button>
            <Button variant="default" className="flex-1"><FileText className="mr-2 h-4 w-4" /> Quote</Button>
          </div>
        </div>

        {/* AI Panel */}
        <div className="p-4 border-b bg-[#f3e8ff]/50 dark:bg-purple-900/10">
          <div className="flex items-center space-x-2 mb-3 text-purple-700 dark:text-purple-400">
            <Sparkles className="h-4 w-4" />
            <h4 className="font-semibold text-sm">AI Summary</h4>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Customer is interested in a Dubai trip. Budget is approx ₹1.5L. Customer is currently asking for a discount on QT-1042.
          </p>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Destination</span>
              <span className="font-medium">{activeChat.destination}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Budget</span>
              <span className="font-medium">₹{(activeChat.potentialValue).toLocaleString('en-IN')}</span>
            </div>
          </div>
          <Button variant="outline" className="w-full text-xs text-purple-700 border-purple-200 hover:bg-purple-50 dark:border-purple-900 dark:hover:bg-purple-900/30">
            Generate Revised Quote
          </Button>
        </div>

        {/* Deal Info */}
        <div className="p-4">
          <h4 className="font-semibold text-sm mb-4 text-muted-foreground uppercase tracking-wider">Active Opportunity</h4>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Stage</div>
              <Badge variant="warning">{activeChat.leadStatus === "HOT" ? "Negotiation" : "New"}</Badge>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Value</div>
              <div className="font-medium">₹{(activeChat.potentialValue).toLocaleString('en-IN')}</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Assigned To</div>
              <div className="flex items-center space-x-2 mt-1">
                <Avatar fallback={activeChat.assignedTo.substring(0, 1)} className="h-6 w-6" />
                <span className="text-sm font-medium">{activeChat.assignedTo}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
