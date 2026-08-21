"use client";

import React from "react";
import { Search, Filter, Plus, MoreHorizontal, Copy, Eye, PenLine, PowerOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PACKAGES } from "@/lib/mock-data";

export default function PackagesPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Travel Packages</h2>
          <p className="text-muted-foreground">Manage your predefined travel itineraries and pricing.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button><Plus className="mr-2 h-4 w-4" /> Add Package</Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search packages..." className="pl-8" />
            </div>
            <Button variant="outline" size="sm" className="h-10"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          </div>
        </div>
        
        <Table>
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
            {PACKAGES.map((pkg) => (
              <TableRow key={pkg.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium text-primary">{pkg.name}</TableCell>
                <TableCell>{pkg.duration}</TableCell>
                <TableCell className="font-medium">₹{(pkg.startingPrice).toLocaleString('en-IN')}</TableCell>
                <TableCell>{pkg.bookings}</TableCell>
                <TableCell className="font-medium text-success">₹{(pkg.revenue).toLocaleString('en-IN')}</TableCell>
                <TableCell>
                  <Badge variant={pkg.status === "Active" ? "success" : "secondary"}>
                    {pkg.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end space-x-2">
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
