"use client";

import React, { useState } from "react";
import { X, Wallet, IndianRupee, Tag, FileText, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCRM } from "@/lib/crm-store";

export default function NewExpenseDrawer() {
  const { activeDrawer, closeDrawer, addExpense } = useCRM();
  const isOpen = activeDrawer === "expense";

  const [formData, setFormData] = useState({
    supplier: "",
    category: "Hotel",
    amount: "25000",
    reference: "BK-1024",
    status: "Paid" as "Paid" | "Pending",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.supplier.trim()) return;

    addExpense({
      supplier: formData.supplier.trim(),
      category: formData.category,
      amount: Number(formData.amount) || 0,
      reference: formData.reference.trim() || "Operational",
      status: formData.status,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ supplier: "", category: "Hotel", amount: "25000", reference: "BK-1024", status: "Paid" });
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
              <Wallet className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">Log Expense</h2>
              <p className="text-xs text-muted-foreground">Record supplier payments, ads, or overhead expenses</p>
            </div>
          </div>
          <button onClick={closeDrawer} className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess && (
          <div className="bg-success/10 border-b border-success/20 text-success p-3 px-6 flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Check className="h-4 w-4" /> Expense logged successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium">Supplier / Vendor / Payee *</label>
            <Input
              placeholder="e.g. Emirates / JW Marriott / Google Ads"
              value={formData.supplier}
              onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <Tag className="h-3.5 w-3.5 text-muted-foreground" /> Category
              </label>
              <select
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs sm:text-sm"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="Hotel">Hotel</option>
                <option value="Flights">Flights</option>
                <option value="Activity">Sightseeing & Tours</option>
                <option value="Marketing">Marketing / Ads</option>
                <option value="Overheads">Office Overheads / Software</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" /> Expense Amount (₹) *
              </label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5 text-muted-foreground" /> Reference / Booking ID
              </label>
              <Input
                placeholder="e.g. BK-1024 / Monthly Cloud"
                value={formData.reference}
                onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">Payment Status</label>
              <select
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs sm:text-sm"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              >
                <option value="Paid">Paid</option>
                <option value="Pending">Pending Approval / Payment</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t flex items-center justify-end gap-3 sticky bottom-0 bg-background pb-2">
            <Button type="button" variant="outline" onClick={closeDrawer} className="h-9">Cancel</Button>
            <Button type="submit" className="h-9 shadow-sm">Save Expense</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
