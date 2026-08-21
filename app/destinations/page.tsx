"use client";

import React, { useState } from "react";
import { Search, Filter, Plus, MoreHorizontal, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DESTINATIONS } from "@/lib/mock-data";
import { exportToCsv } from "@/lib/export-csv";

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDestinations = DESTINATIONS.filter(dst =>
    dst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCsv = () => {
    exportToCsv("destinations_report", filteredDestinations, [
      { header: "Destination Name", key: "name" },
      { header: "Active Packages Count", key: "activePackages" },
      { header: "Total Leads Generated", key: "totalLeads" },
      { header: "Total Bookings", key: "bookings" },
      { header: "Total Revenue (INR)", key: "revenue", format: (v) => `₹${Number(v).toLocaleString('en-IN')}` },
      { header: "Status", key: "status" },
    ]);
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Destinations</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage your supported travel destinations.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" onClick={handleExportCsv} className="h-9">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
          </Button>
          <Button size="sm" className="h-9 shadow-xs">
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Destination
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 sm:p-4 border-b gap-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 sm:w-72 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search destinations..." 
                className="pl-8 text-xs sm:text-sm h-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 shrink-0">
              <Filter className="mr-1.5 h-3.5 w-3.5" /> Filters
            </Button>
          </div>
          <div className="text-xs text-muted-foreground">
            Showing {filteredDestinations.length} destinations
          </div>
        </div>
        
        <Table className="min-w-[750px]">
          <TableHeader>
            <TableRow>
              <TableHead>Destination</TableHead>
              <TableHead>Active Packages</TableHead>
              <TableHead>Total Leads</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Total Revenue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDestinations.map((dst) => (
              <TableRow key={dst.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-semibold text-primary">{dst.name}</TableCell>
                <TableCell className="text-xs sm:text-sm">{dst.activePackages}</TableCell>
                <TableCell className="text-xs sm:text-sm">{dst.totalLeads}</TableCell>
                <TableCell className="text-xs sm:text-sm">{dst.bookings}</TableCell>
                <TableCell className="font-medium text-xs sm:text-sm">₹{(dst.revenue).toLocaleString('en-IN')}</TableCell>
                <TableCell>
                  <Badge variant={dst.status === "Active" ? "success" : "secondary"} className="text-xs">
                    {dst.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
