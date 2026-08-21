"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal, 
  MessageCircle, 
  Phone,
  Trash2,
  RotateCcw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { exportToCsv } from "@/lib/export-csv";
import { useLeads } from "@/lib/leads-store";

export default function LeadsPage() {
  const { leads, openNewLeadModal, deleteLead, resetLeads } = useLeads();
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("ALL");

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch = 
      lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm);
    const matchesStage = stageFilter === "ALL" || lead.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const handleExportCsv = () => {
    exportToCsv("leads_report", filteredLeads, [
      { header: "Lead ID", key: "id" },
      { header: "Customer Name", key: "customerName" },
      { header: "Phone Number", key: "phone" },
      { header: "Destination", key: "destination" },
      { header: "Travel Dates", key: "travelDates" },
      { header: "Budget (INR)", key: "budget", format: (v) => `₹${Number(v).toLocaleString('en-IN')}` },
      { header: "Travelers", key: "travelers" },
      { header: "Lead Source", key: "source" },
      { header: "Pipeline Stage", key: "stage" },
      { header: "Assigned Agent", key: "assignedTo" },
      { header: "Lead Score", key: "score" },
      { header: "Last Activity", key: "lastActivity" },
    ]);
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Leads</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage your travel leads and inquiries in real-time.
          </p>
        </div>
        <div className="flex items-center flex-wrap gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" onClick={resetLeads} className="h-9 text-xs text-muted-foreground hover:text-foreground" title="Reset leads to initial mock dataset">
            <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
            Reset Data
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCsv} className="h-9">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export CSV
          </Button>
          <Button size="sm" onClick={openNewLeadModal} className="h-9 shadow-xs">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            New Lead
          </Button>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-lg border bg-card shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 sm:p-4 border-b gap-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 sm:w-72 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                className="pl-8 text-xs sm:text-sm h-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Stage filter dropdown */}
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-2.5 text-xs text-muted-foreground font-medium"
            >
              <option value="ALL">All Stages</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Requirement">Requirement</option>
              <option value="Quotation">Quotation</option>
              <option value="Negotiation">Negotiation</option>
            </select>
          </div>
          <div className="flex items-center justify-between sm:justify-end text-xs text-muted-foreground">
            <span>Showing {filteredLeads.length} leads</span>
          </div>
        </div>
        
        <Table className="min-w-[850px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-10 text-center">
                <input type="checkbox" className="rounded border-input bg-background" />
              </TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Assigned</TableHead>
              <TableHead>Last Activity</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLeads.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground text-xs sm:text-sm">
                  No leads found. Click <span className="font-semibold text-primary cursor-pointer underline" onClick={openNewLeadModal}>New Lead</span> to create one!
                </TableCell>
              </TableRow>
            ) : (
              filteredLeads.map((lead) => (
                <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="text-center">
                    <input type="checkbox" className="rounded border-input bg-background" />
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <span>{lead.customerName}</span>
                      <span className="text-[10px] text-muted-foreground font-normal">({lead.id})</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{lead.phone}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-xs sm:text-sm">{lead.destination}</div>
                    <div className="text-xs text-muted-foreground">{lead.travelDates}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-semibold text-xs sm:text-sm">₹{(lead.budget).toLocaleString('en-IN')}</div>
                    <div className="text-xs text-muted-foreground">{lead.travelers}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-xs">
                      {lead.source === "WhatsApp" && <MessageCircle className="mr-1 h-3.5 w-3.5 text-success shrink-0" />}
                      <span>{lead.source}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={lead.stage === "New" ? "default" : lead.stage === "Negotiation" ? "warning" : "secondary"}
                      className="whitespace-nowrap text-xs"
                    >
                      {lead.stage}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs">{lead.assignedTo}</TableCell>
                  <TableCell>
                    <div className="text-xs">{lead.lastActivity}</div>
                    <div className="text-[11px] text-muted-foreground">Score: <span className={lead.score === "HOT" ? "text-destructive font-bold" : lead.score === "WARM" ? "text-amber-500 font-semibold" : ""}>{lead.score}</span></div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success hover:bg-success/10" title="Chat on WhatsApp">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10" title="Call">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10" 
                        onClick={() => deleteLead(lead.id)}
                        title="Delete Lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
