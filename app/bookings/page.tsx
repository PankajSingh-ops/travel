"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BOOKINGS } from "@/lib/mock-data";
import { exportToCsv } from "@/lib/export-csv";

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = BOOKINGS.filter(b =>
    b.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCsv = () => {
    exportToCsv("bookings_report", filteredBookings, [
      { header: "Booking ID", key: "id" },
      { header: "Customer Name", key: "customerName" },
      { header: "Destination", key: "destination" },
      { header: "Travel Dates", key: "travelDates" },
      { header: "Total Amount (INR)", key: "amount", format: (v) => `₹${Number(v).toLocaleString('en-IN')}` },
      { header: "Pending Amount (INR)", key: "pending", format: (v) => `₹${Number(v).toLocaleString('en-IN')}` },
      { header: "Booking Status", key: "status" },
      { header: "Assigned Agent", key: "assignedTo" },
    ]);
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Bookings</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage your confirmed trips and revenue.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" onClick={handleExportCsv} className="h-9">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
          </Button>
          <Button size="sm" className="h-9 shadow-xs">
            <Plus className="mr-1.5 h-3.5 w-3.5" /> New Booking
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 sm:p-4 border-b gap-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 sm:w-72 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search bookings..." 
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
            Showing {filteredBookings.length} bookings
          </div>
        </div>
        
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Destination</TableHead>
              <TableHead>Travel Dates</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Assigned</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBookings.map((booking) => (
              <TableRow key={booking.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-semibold text-primary">{booking.id}</TableCell>
                <TableCell className="font-medium">{booking.customerName}</TableCell>
                <TableCell>{booking.destination}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{booking.travelDates}</TableCell>
                <TableCell>
                  <div className="font-medium">₹{(booking.amount).toLocaleString('en-IN')}</div>
                  <div className="text-[11px] text-muted-foreground">Pending: ₹{(booking.pending).toLocaleString('en-IN')}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={booking.status === "Confirmed" ? "success" : "warning"} className="text-xs">
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs">{booking.assignedTo}</TableCell>
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
