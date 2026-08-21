"use client";

import React, { useState } from "react";
import { X, Plane, IndianRupee, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCRM } from "@/lib/crm-store";

export default function NewPackageDrawer() {
  const { activeDrawer, closeDrawer, addPackage } = useCRM();
  const isOpen = activeDrawer === "package";

  const [formData, setFormData] = useState({
    name: "",
    duration: "5 Nights / 6 Days",
    startingPrice: "65000",
    status: "Active" as "Active" | "Inactive",
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    addPackage({
      name: formData.name.trim(),
      duration: formData.duration.trim(),
      startingPrice: Number(formData.startingPrice) || 50000,
      status: formData.status,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", duration: "5 Nights / 6 Days", startingPrice: "65000", status: "Active" });
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
              <Plane className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight">Add Travel Package</h2>
              <p className="text-xs text-muted-foreground">Create predefined itinerary offering</p>
            </div>
          </div>
          <button onClick={closeDrawer} className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </div>

        {isSuccess && (
          <div className="bg-success/10 border-b border-success/20 text-success p-3 px-6 flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Check className="h-4 w-4" /> Package published successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium flex items-center gap-1.5">
              <Plane className="h-3.5 w-3.5 text-muted-foreground" /> Package Name *
            </label>
            <Input
              placeholder="e.g. Switzerland Alpine Panorama"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-muted-foreground" /> Duration
              </label>
              <Input
                placeholder="e.g. 6 Nights / 7 Days"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" /> Starting Price (₹) *
              </label>
              <Input
                type="number"
                value={formData.startingPrice}
                onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium">Status</label>
            <select
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs sm:text-sm"
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            >
              <option value="Active">Active (Available for booking)</option>
              <option value="Inactive">Draft / Inactive</option>
            </select>
          </div>

          <div className="pt-4 border-t flex items-center justify-end gap-3 sticky bottom-0 bg-background pb-2">
            <Button type="button" variant="outline" onClick={closeDrawer} className="h-9">Cancel</Button>
            <Button type="submit" className="h-9 shadow-sm">Save Package</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
