"use client";

import React, { useState } from "react";
import { X, User, Phone, Mail, Tag, Check, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCRM } from "@/lib/crm-store";

export function NewCustomerDrawer() {
  const { activeDrawer, closeDrawer, addCustomer } = useCRM();
  const isOpen = activeDrawer === "customer";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    tags: "Family Traveler",
    assignedTo: "Amit",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    addCustomer({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, '')}@example.com`,
      tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
      assignedTo: formData.assignedTo,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", phone: "", email: "", tags: "Family Traveler", assignedTo: "Amit" });
      closeDrawer();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in" onClick={closeDrawer} />
      <div className="relative z-50 flex h-full w-full max-w-lg flex-col bg-background shadow-2xl border-l animate-in slide-in-from-right duration-300">
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-muted/20">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">Add New Customer</h2>
              <p className="text-xs text-muted-foreground">Store traveler profile and contact details</p>
            </div>
          </div>
          <button onClick={closeDrawer} className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess && (
          <div className="bg-success/10 border-b border-success/20 text-success p-3 px-6 flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Check className="h-4 w-4" /> Customer added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-muted-foreground" /> Customer Full Name *
            </label>
            <Input
              placeholder="e.g. Ramesh Chandra"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium flex items-center gap-1.5">
              <Phone className="h-3.5 w-3.5 text-muted-foreground" /> Phone Number *
            </label>
            <Input
              placeholder="e.g. +91 99887 76655"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium flex items-center gap-1.5">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" /> Email Address
            </label>
            <Input
              type="email"
              placeholder="e.g. ramesh@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" /> Customer Tags (comma separated)
            </label>
            <Input
              placeholder="e.g. VIP, Luxury, Honeymoon, Solo"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">Assigned Agent</label>
            <select
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs sm:text-sm"
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
            >
              <option value="Amit">Amit</option>
              <option value="Neha">Neha</option>
              <option value="Rahul">Rahul</option>
            </select>
          </div>

          <div className="pt-4 border-t flex items-center justify-end gap-3 sticky bottom-0 bg-background pb-2">
            <Button type="button" variant="outline" onClick={closeDrawer} className="h-9">Cancel</Button>
            <Button type="submit" className="h-9 shadow-sm">Save Customer</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
