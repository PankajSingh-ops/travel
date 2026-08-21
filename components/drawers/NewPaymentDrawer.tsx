"use client";

import React, { useState } from "react";
import { X, CreditCard, IndianRupee, User, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCRM } from "@/lib/crm-store";

export default function NewPaymentDrawer() {
  const { activeDrawer, closeDrawer, addPayment } = useCRM();
  const isOpen = activeDrawer === "payment";

  const [formData, setFormData] = useState({
    invoice: "INV-2046",
    customer: "",
    bookingId: "BK-1026",
    amount: "50000",
    method: "UPI",
    status: "Paid" as "Paid" | "Pending" | "Overdue",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.customer.trim()) return;

    addPayment({
      invoice: formData.invoice.trim(),
      customer: formData.customer.trim(),
      bookingId: formData.bookingId.trim(),
      amount: Number(formData.amount) || 0,
      method: formData.method,
      status: formData.status,
      date: "Aug 21, 2026",
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ invoice: `INV-${Math.floor(2050 + Math.random() * 50)}`, customer: "", bookingId: "BK-1026", amount: "50000", method: "UPI", status: "Paid" });
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
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">Record Payment</h2>
              <p className="text-xs text-muted-foreground">Log incoming customer collection or refund</p>
            </div>
          </div>
          <button onClick={closeDrawer} className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess && (
          <div className="bg-success/10 border-b border-success/20 text-success p-3 px-6 flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Check className="h-4 w-4" /> Payment transaction logged!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-muted-foreground" /> Customer Name *
            </label>
            <Input
              placeholder="e.g. Rahul Sharma"
              value={formData.customer}
              onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" /> Invoice Number
              </label>
              <Input
                value={formData.invoice}
                onChange={(e) => setFormData({ ...formData, invoice: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">Booking ID</label>
              <Input
                value={formData.bookingId}
                onChange={(e) => setFormData({ ...formData, bookingId: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" /> Amount Received (₹) *
              </label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">Payment Method</label>
              <select
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs sm:text-sm"
                value={formData.method}
                onChange={(e) => setFormData({ ...formData, method: e.target.value })}
              >
                <option value="UPI">UPI / GPay / PhonePe</option>
                <option value="Bank Transfer">NEFT / IMPS / RTGS</option>
                <option value="Credit Card">Credit Card</option>
                <option value="Cash">Cash Deposit</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">Status</label>
            <select
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs sm:text-sm"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            >
              <option value="Paid">Paid (Verified)</option>
              <option value="Pending">Pending Clearance</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          <div className="pt-4 border-t flex items-center justify-end gap-3 sticky bottom-0 bg-background pb-2">
            <Button type="button" variant="outline" onClick={closeDrawer} className="h-9">Cancel</Button>
            <Button type="submit" className="h-9 shadow-sm">Record Payment</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
