"use client";

import React, { useState } from "react";
import { X, User, Phone, MapPin, Calendar, Users, IndianRupee, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLeads } from "@/lib/leads-store";

export function NewLeadDrawer() {
  const { isNewLeadModalOpen, closeNewLeadModal, addLead } = useLeads();

  const [formData, setFormData] = useState({
    customerName: "",
    phone: "",
    destination: "Dubai",
    travelDates: "",
    travelers: "2 Adults",
    budget: "150000",
    source: "WhatsApp",
    stage: "New",
    assignedTo: "Amit",
    score: "HOT" as "HOT" | "WARM" | "COLD",
    notes: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isNewLeadModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.customerName.trim()) {
      newErrors.customerName = "Customer name is required";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    if (!formData.destination.trim()) {
      newErrors.destination = "Destination is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    const budgetNum = Number(formData.budget) || 100000;

    addLead({
      customerName: formData.customerName.trim(),
      phone: formData.phone.trim(),
      destination: formData.destination.trim(),
      travelDates: formData.travelDates.trim() || "Flexible Dates",
      travelers: formData.travelers || "2 Adults",
      budget: budgetNum,
      source: formData.source,
      stage: formData.stage,
      assignedTo: formData.assignedTo,
      score: formData.score,
      notes: formData.notes,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      // Reset form
      setFormData({
        customerName: "",
        phone: "",
        destination: "Dubai",
        travelDates: "",
        travelers: "2 Adults",
        budget: "150000",
        source: "WhatsApp",
        stage: "New",
        assignedTo: "Amit",
        score: "HOT",
        notes: "",
      });
      closeNewLeadModal();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dark backdrop overlay */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
        onClick={closeNewLeadModal}
        aria-hidden="true"
      />

      {/* Slide-over Drawer */}
      <div className="relative z-50 flex h-full w-full max-w-lg flex-col bg-background shadow-2xl border-l animate-in slide-in-from-right duration-300 overflow-hidden">
        {/* Drawer Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-6 bg-muted/20">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">Create New Lead</h2>
              <p className="text-xs text-muted-foreground">Add inquiry details to start sales pipeline tracking</p>
            </div>
          </div>
          <button
            onClick={closeNewLeadModal}
            className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success Banner */}
        {isSuccess && (
          <div className="bg-success/10 border-b border-success/20 text-success p-3 px-6 flex items-center gap-2 text-xs sm:text-sm font-medium">
            <Check className="h-4 w-4" /> Lead created successfully! Adding to pipeline...
          </div>
        )}

        {/* Drawer Body - Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Customer Details */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer Information</h4>
            
            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-muted-foreground" /> Customer Name *
              </label>
              <Input
                placeholder="e.g. Siddharth Verma"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className={errors.customerName ? "border-destructive" : ""}
                required
              />
              {errors.customerName && <p className="text-[11px] text-destructive">{errors.customerName}</p>}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-muted-foreground" /> Phone / WhatsApp *
              </label>
              <Input
                placeholder="e.g. +91 98123 45678"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={errors.phone ? "border-destructive" : ""}
                required
              />
              {errors.phone && <p className="text-[11px] text-destructive">{errors.phone}</p>}
            </div>
          </div>

          {/* Travel Trip Details */}
          <div className="space-y-3 pt-3 border-t">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Trip Requirements</h4>

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
                  <option value="Dubai">Dubai, UAE</option>
                  <option value="Bali">Bali, Indonesia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Kashmir">Kashmir, India</option>
                  <option value="Europe">Europe Tour</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Vietnam">Vietnam</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-muted-foreground" /> Travel Dates
                </label>
                <Input
                  placeholder="e.g. Oct 10 - Oct 18, 2026"
                  value={formData.travelDates}
                  onChange={(e) => setFormData({ ...formData, travelDates: e.target.value })}
                  className="h-9 text-xs sm:text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-muted-foreground" /> Travelers
                </label>
                <Input
                  placeholder="e.g. 2 Adults, 1 Child"
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  className="h-9 text-xs sm:text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium flex items-center gap-1.5">
                  <IndianRupee className="h-3.5 w-3.5 text-muted-foreground" /> Estimated Budget (₹)
                </label>
                <Input
                  type="number"
                  placeholder="e.g. 150000"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="h-9 text-xs sm:text-sm"
                />
              </div>
            </div>
          </div>

          {/* Sales Routing Details */}
          <div className="space-y-3 pt-3 border-t">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Pipeline & Assignment</h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-medium">Lead Source</label>
                <select
                  className="w-full h-9 rounded-md border border-input bg-background px-2.5 text-xs"
                  value={formData.source}
                  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                >
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Website">Website</option>
                  <option value="Instagram">Instagram</option>
                  <option value="Google Ads">Google Ads</option>
                  <option value="Referral">Referral</option>
                  <option value="Walk-in">Walk-in</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium">Pipeline Stage</label>
                <select
                  className="w-full h-9 rounded-md border border-input bg-background px-2.5 text-xs"
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Requirement">Requirement</option>
                  <option value="Quotation">Quotation</option>
                  <option value="Negotiation">Negotiation</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium">Priority Score</label>
                <select
                  className="w-full h-9 rounded-md border border-input bg-background px-2.5 text-xs font-medium"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value as any })}
                >
                  <option value="HOT">🔥 HOT</option>
                  <option value="WARM">⚡ WARM</option>
                  <option value="COLD">❄️ COLD</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">Assign To Agent</label>
              <select
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs sm:text-sm"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              >
                <option value="Amit">Amit (Senior Sales Executive)</option>
                <option value="Neha">Neha (Holiday Specialist)</option>
                <option value="Rahul">Rahul Sharma (Owner)</option>
                <option value="Unassigned">Unassigned (General Pool)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">Notes / Special Requests</label>
              <textarea
                rows={2}
                placeholder="e.g. 5-star hotel with sea view required, vegetarian meal preference..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full rounded-md border border-input bg-background p-2.5 text-xs sm:text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>

          {/* Drawer Footer Buttons */}
          <div className="pt-4 border-t flex items-center justify-end gap-3 sticky bottom-0 bg-background pb-2">
            <Button type="button" variant="outline" onClick={closeNewLeadModal} className="h-9">
              Cancel
            </Button>
            <Button type="submit" className="h-9 shadow-sm">
              <Check className="mr-1.5 h-4 w-4" /> Save Lead
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
