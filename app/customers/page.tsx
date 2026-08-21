"use client";

import React from "react";
import { Search, Filter, Download, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CUSTOMERS } from "@/lib/mock-data";

export default function CustomersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Customers</h2>
          <p className="text-muted-foreground">Manage your customer relationships and history.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
          <Button><Plus className="mr-2 h-4 w-4" /> New Customer</Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customers..." className="pl-8" />
            </div>
            <Button variant="outline" size="sm" className="h-10"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          </div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Customer Since</TableHead>
              <TableHead>Lifetime Value</TableHead>
              <TableHead>Bookings</TableHead>
              <TableHead>Tags</TableHead>
              <TableHead>Assigned</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {CUSTOMERS.map((customer) => (
              <TableRow key={customer.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{customer.name}</TableCell>
                <TableCell>
                  <div className="text-sm">{customer.phone}</div>
                  <div className="text-xs text-muted-foreground">{customer.email}</div>
                </TableCell>
                <TableCell>{customer.since}</TableCell>
                <TableCell className="font-medium">₹{(customer.lifetimeValue).toLocaleString('en-IN')}</TableCell>
                <TableCell>{customer.bookingsCount}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {customer.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs font-normal bg-muted">{tag}</Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{customer.assignedTo}</TableCell>
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
