"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Target, 
  KanbanSquare, 
  MessageCircle, 
  Briefcase,
  FileText,
  CreditCard,
  PieChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plane,
  Building2,
  Wallet
} from "lucide-react";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  {
    label: "Sales",
    items: [
      { label: "Leads", href: "/leads", icon: Target },
      { label: "Pipeline", href: "/pipeline", icon: KanbanSquare },
      { label: "Quotations", href: "/quotations", icon: FileText },
      { label: "Bookings", href: "/bookings", icon: Briefcase },
    ]
  },
  { label: "Customers", href: "/customers", icon: Users },
  { label: "WhatsApp Inbox", href: "/whatsapp", icon: MessageCircle },
  {
    label: "Travel",
    items: [
      { label: "Packages", href: "/packages", icon: Plane },
      { label: "Destinations", href: "/destinations", icon: Target },
      { label: "Suppliers", href: "/suppliers", icon: Building2 },
    ]
  },
  {
    label: "Finance",
    items: [
      { label: "Payments", href: "/payments", icon: CreditCard },
      { label: "Invoices", href: "/invoices", icon: FileText },
      { label: "Expenses", href: "/expenses", icon: Wallet },
    ]
  },
  { label: "Analytics", href: "/analytics", icon: PieChart },
  { label: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const renderLink = (item: { label: string, href: string, icon: any }, isChild = false) => {
    const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
    const Icon = item.icon;
    
    return (
      <Link 
        key={item.href} 
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          active 
            ? "bg-primary text-primary-foreground" 
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
          collapsed && "justify-center px-0"
        )}
        title={collapsed ? item.label : undefined}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {!collapsed && <span>{item.label}</span>}
      </Link>
    );
  };

  return (
    <aside 
      className={cn(
        "relative flex h-screen flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-16 shrink-0 items-center border-b px-4">
        {!collapsed && <span className="text-xl font-bold tracking-tight text-primary">TripFlow</span>}
        {collapsed && <span className="mx-auto text-xl font-bold tracking-tight text-primary">TF</span>}
      </div>

      <div className="flex-1 overflow-auto py-4 scrollbar-hide">
        <nav className="flex flex-col gap-1 px-2">
          {NAV_ITEMS.map((section, i) => {
            if (section.items) {
              return (
                <div key={i} className="mb-4">
                  {!collapsed && (
                    <h4 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      {section.label}
                    </h4>
                  )}
                  <div className="flex flex-col gap-1">
                    {section.items.map((item) => renderLink(item, true))}
                  </div>
                </div>
              );
            }
            return <div key={i} className="mb-2">{renderLink(section as any)}</div>;
          })}
        </nav>
      </div>

      <div className="mt-auto border-t p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>
    </aside>
  );
}
