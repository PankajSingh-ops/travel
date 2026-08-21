"use client";

import React, { useState } from "react";
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal, 
  MessageCircle, 
  Phone 
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
import { LEADS } from "@/lib/mock-data";
import { exportToCsv } from "@/lib/export-csv";

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = LEADS.filter(lead => 
    lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCsv = () => {
    exportToCsv("leads_report", filteredLeads, [
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
            Manage your travel leads and customer inquiries.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" onClick={handleExportCsv} className="h-9">
            <Download className="mr-1.5 h-3.5 w-3.5" />
            Export CSV
          </Button>
          <Button size="sm" className="h-9 shadow-xs">
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
            <Button variant="outline" size="sm" className="h-9 shrink-0">
              <Filter className="mr-1.5 h-3.5 w-3.5" />
              Filters
            </Button>
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
            {filteredLeads.map((lead) => (
              <TableRow key={lead.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="text-center">
                  <input type="checkbox" className="rounded border-input bg-background" />
                </TableCell>
                <TableCell>
                  <div className="font-medium text-foreground">{lead.customerName}</div>
                  <div className="text-xs text-muted-foreground">{lead.phone}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{lead.destination}</div>
                  <div className="text-xs text-muted-foreground">{lead.travelDates}</div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">₹{(lead.budget).toLocaleString('en-IN')}</div>
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
                  <div className="text-[11px] text-muted-foreground">Score: <span className={lead.score === "HOT" ? "text-destructive font-bold" : ""}>{lead.score}</span></div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-success hover:text-success hover:bg-success/10">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary hover:text-primary hover:bg-primary/10">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
