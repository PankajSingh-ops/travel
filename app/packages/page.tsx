"use client";

import React, { useState } from "react";
import { Search, Filter, Plus, Copy, Eye, PenLine, PowerOff, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PACKAGES } from "@/lib/mock-data";
import { exportToCsv } from "@/lib/export-csv";

export default function PackagesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPackages = PACKAGES.filter(pkg =>
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCsv = () => {
    exportToCsv("packages_report", filteredPackages, [
      { header: "Package Name", key: "name" },
      { header: "Duration", key: "duration" },
      { header: "Starting Price (INR)", key: "startingPrice", format: (v) => `₹${Number(v).toLocaleString('en-IN')}` },
      { header: "Total Bookings", key: "bookings" },
      { header: "Revenue Generated (INR)", key: "revenue", format: (v) => `₹${Number(v).toLocaleString('en-IN')}` },
      { header: "Status", key: "status" },
    ]);
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Travel Packages</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage your predefined travel itineraries and pricing.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" onClick={handleExportCsv} className="h-9">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
          </Button>
          <Button size="sm" className="h-9 shadow-xs">
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Package
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 sm:p-4 border-b gap-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 sm:w-72 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search packages..." 
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
            Showing {filteredPackages.length} packages
          </div>
        </div>
        
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Package Name</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Starting Price</TableHead>
              <TableHead>Total Bookings</TableHead>
              <TableHead>Revenue Generated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPackages.map((pkg) => (
              <TableRow key={pkg.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-semibold text-primary">{pkg.name}</TableCell>
                <TableCell className="text-xs sm:text-sm">{pkg.duration}</TableCell>
                <TableCell className="font-medium text-xs sm:text-sm">₹{(pkg.startingPrice).toLocaleString('en-IN')}</TableCell>
                <TableCell className="text-xs sm:text-sm">{pkg.bookings}</TableCell>
                <TableCell className="font-semibold text-success text-xs sm:text-sm">₹{(pkg.revenue).toLocaleString('en-IN')}</TableCell>
                <TableCell>
                  <Badge variant={pkg.status === "Active" ? "success" : "secondary"} className="text-xs">
                    {pkg.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><PenLine className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Copy className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><PowerOff className="h-4 w-4" /></Button>
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
