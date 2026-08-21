"use client";

import React, { useState } from "react";
import { X, Briefcase, User, MapPin, Calendar, IndianRupee, Users, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCRM } from "@/lib/crm-store";

export default function NewBookingDrawer() {
  const { activeDrawer, closeDrawer, addBooking } = useCRM();
  const isOpen = activeDrawer === "booking";

  const [formData, setFormData] = useState({
    customerName: "",
    destination: "Dubai",
    travelDates: "",
    travelers: "2 Adults",
    amount: "150000",
    paid: "50000",
    status: "Partially Paid" as "Confirmed" | "Partially Paid" | "Completed" | "Cancelled",
    assignedTo: "Amit",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customerName.trim() || !formData.destination.trim()) return;

    const total = Number(formData.amount) || 0;
    const paid = Number(formData.paid) || 0;
    const pending = Math.max(0, total - paid);

    addBooking({
      customerName: formData.customerName.trim(),
      destination: formData.destination.trim(),
      travelDates: formData.travelDates.trim() || "Upcoming Trip",
      travelers: formData.travelers || "2 Adults",
      amount: total,
      paid: paid,
      pending: pending,
      status: paid >= total ? "Confirmed" : formData.status,
      assignedTo: formData.assignedTo,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        customerName: "",
        destination: "Dubai",
        travelDates: "",
        travelers: "2 Adults",
        amount: "150000",
        paid: "50000",
        status: "Partially Paid",
        assignedTo: "Amit",
      });
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
              <Briefcase className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">Create Confirmed Booking</h2>
              <p className="text-xs text-muted-foreground">Log trip confirmation and payment schedule</p>
            </div>
          </div>
          <button onClick={closeDrawer} className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess && (
          <div className="bg-success/10 border-b border-success/20 text-success p-3 px-6 flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Check className="h-4 w-4" /> Booking recorded successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-muted-foreground" /> Customer Name *
            </label>
            <Input
              placeholder="e.g. Vikram Malhotra"
              value={formData.customerName}
              onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-muted-foreground" /> Destination *
              </label>
              <select
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs sm:text-sm"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              >
                <option value="Dubai">Dubai</option>
                <option value="Bali">Bali</option>
                <option value="Maldives">Maldives</option>
                <option value="Kashmir">Kashmir</option>
                <option value="Europe">Europe</option>
                <option value="Thailand">Thailand</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Travel Dates
              </label>
              <Input
                placeholder="e.g. Nov 15 - Nov 20, 2026"
                value={formData.travelDates}
                onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5 text-muted-foreground" /> Travelers
              </label>
              <Input
                placeholder="e.g. 2 Adults"
                value={formData.travelers}
                onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
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
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t">
            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" /> Total Booking Amount (₹) *
              </label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" /> Advance Paid (₹)
              </label>
              <Input
                type="number"
                value={formData.paid}
                onChange={(e) => setFormData({ ...formData, paid: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">Booking Status</label>
            <select
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs sm:text-sm"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            >
              <option value="Partially Paid">Partially Paid</option>
              <option value="Confirmed">Confirmed (Fully Paid)</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="pt-4 border-t flex items-center justify-end gap-3 sticky bottom-0 bg-background pb-2">
            <Button type="button" variant="outline" onClick={closeDrawer} className="h-9">Cancel</Button>
            <Button type="submit" className="h-9 shadow-sm">Save Booking</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
