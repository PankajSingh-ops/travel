"use client";

import React from "react";
import { Search, Filter, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DESTINATIONS } from "@/lib/mock-data";

export default function DestinationsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Destinations</h2>
          <p className="text-muted-foreground">Manage your supported travel destinations.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button><Plus className="mr-2 h-4 w-4" /> Add Destination</Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search destinations..." className="pl-8" />
            </div>
            <Button variant="outline" size="sm" className="h-10"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          </div>
        </div>
        
        <Table>
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
            {DESTINATIONS.map((dst) => (
              <TableRow key={dst.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium text-primary">{dst.name}</TableCell>
                <TableCell>{dst.activePackages}</TableCell>
                <TableCell>{dst.totalLeads}</TableCell>
                <TableCell>{dst.bookings}</TableCell>
                <TableCell className="font-medium">₹{(dst.revenue).toLocaleString('en-IN')}</TableCell>
                <TableCell>
                  <Badge variant={dst.status === "Active" ? "success" : "secondary"}>
                    {dst.status}
                  </Badge>
                </TableCell>
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
