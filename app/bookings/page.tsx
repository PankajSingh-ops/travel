"use client";

import React from "react";
import { Search, Filter, Download, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BOOKINGS } from "@/lib/mock-data";

export default function BookingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Bookings</h2>
          <p className="text-muted-foreground">Manage your confirmed trips and revenue.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
          <Button><Plus className="mr-2 h-4 w-4" /> New Booking</Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search bookings..." className="pl-8" />
            </div>
            <Button variant="outline" size="sm" className="h-10"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          </div>
        </div>
        
        <Table>
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
            {BOOKINGS.map((booking) => (
              <TableRow key={booking.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium text-primary">{booking.id}</TableCell>
                <TableCell className="font-medium">{booking.customerName}</TableCell>
                <TableCell>{booking.destination}</TableCell>
                <TableCell className="text-sm">{booking.travelDates}</TableCell>
                <TableCell>
                  <div className="font-medium">₹{(booking.amount).toLocaleString('en-IN')}</div>
                  <div className="text-xs text-muted-foreground">Pending: ₹{(booking.pending).toLocaleString('en-IN')}</div>
                </TableCell>
                <TableCell>
                  <Badge variant={booking.status === "Confirmed" ? "success" : "warning"}>
                    {booking.status}
                  </Badge>
                </TableCell>
                <TableCell>{booking.assignedTo}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
