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

export default function LeadsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLeads = LEADS.filter(lead => 
    lead.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Leads</h2>
          <p className="text-muted-foreground">
            Manage your travel leads and inquiries.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Lead
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">
              Showing {filteredLeads.length} leads
            </span>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">
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
                  <div className="font-medium">{lead.customerName}</div>
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
                  <div className="flex items-center">
                    {lead.source === "WhatsApp" && <MessageCircle className="mr-1 h-3 w-3 text-success" />}
                    {lead.source}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant={lead.stage === "New" ? "default" : lead.stage === "Negotiation" ? "warning" : "secondary"}
                    className="whitespace-nowrap"
                  >
                    {lead.stage}
                  </Badge>
                </TableCell>
                <TableCell>{lead.assignedTo}</TableCell>
                <TableCell>
                  <div className="text-sm">{lead.lastActivity}</div>
                  <div className="text-xs text-muted-foreground">Score: <span className={lead.score === "HOT" ? "text-destructive font-bold" : ""}>{lead.score}</span></div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-success">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
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
