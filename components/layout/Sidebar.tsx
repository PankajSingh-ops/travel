"use client";

import React from "react";
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
  Wallet,
  X
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useSidebar } from "../../lib/sidebar-context";

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
  const { isMobileOpen, closeMobile, isCollapsed, toggleCollapsed } = useSidebar();
  const pathname = usePathname();

  const renderLink = (item: { label: string, href: string, icon: any }, isChild = false, isMobile = false) => {
    const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
    const Icon = item.icon;
    
    return (
      <Link 
        key={item.href} 
        href={item.href}
        onClick={() => {
          if (isMobile) closeMobile();
        }}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          active 
            ? "bg-primary text-primary-foreground font-semibold shadow-sm" 
            : "text-muted-foreground hover:bg-muted hover:text-foreground",
          !isMobile && isCollapsed && "justify-center px-0"
        )}
        title={!isMobile && isCollapsed ? item.label : undefined}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {(isMobile || !isCollapsed) && <span>{item.label}</span>}
      </Link>
    );
  };

  const navContent = (isMobile = false) => (
    <div className="flex-1 overflow-y-auto py-4 scrollbar-hide">
      <nav className="flex flex-col gap-1 px-2">
        {NAV_ITEMS.map((section, i) => {
          if (section.items) {
            return (
              <div key={i} className="mb-3">
                {(isMobile || !isCollapsed) && (
                  <h4 className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/80">
                    {section.label}
                  </h4>
                )}
                <div className="flex flex-col gap-0.5">
                  {section.items.map((item) => renderLink(item, true, isMobile))}
                </div>
              </div>
            );
          }
          return <div key={i} className="mb-1">{renderLink(section as any, false, isMobile)}</div>;
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop & Drawer */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs transition-opacity lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer (off-canvas) */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r bg-sidebar text-sidebar-foreground shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              TF
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">TripFlow</span>
          </div>
          <button
            onClick={closeMobile}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {navContent(true)}

        <div className="border-t p-3 text-xs text-muted-foreground text-center">
          TripFlow Travel CRM &copy; 2026
        </div>
      </aside>

      {/* Desktop Sidebar (hidden on mobile, visible lg+) */}
      <aside 
        className={cn(
          "relative hidden h-screen flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 lg:flex",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 shrink-0 items-center border-b px-4">
          {!isCollapsed ? (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                TF
              </div>
              <span className="text-xl font-bold tracking-tight text-primary">TripFlow</span>
            </div>
          ) : (
            <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
              TF
            </div>
          )}
        </div>

        {navContent(false)}

        <div className="mt-auto border-t p-2">
          <button
            onClick={toggleCollapsed}
            className="flex w-full items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
      </aside>
    </>
  );
}
