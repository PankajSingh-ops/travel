"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { exportToCsv } from "@/lib/export-csv";
import { useCRM } from "@/lib/crm-store";

export default function CustomersPage() {
  const { customers, openDrawer, deleteCustomer } = useCRM();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCsv = () => {
    exportToCsv("customers_report", filteredCustomers, [
      { header: "Customer ID", key: "id" },
      { header: "Customer Name", key: "name" },
      { header: "Phone Number", key: "phone" },
      { header: "Email Address", key: "email" },
      { header: "Customer Since", key: "since" },
      { header: "Lifetime Value (INR)", key: "lifetimeValue", format: (v) => `₹${Number(v).toLocaleString('en-IN')}` },
      { header: "Total Bookings", key: "bookingsCount" },
      { header: "Tags", key: "tags", format: (v) => Array.isArray(v) ? v.join(", ") : v },
      { header: "Assigned Agent", key: "assignedTo" },
    ]);
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Customers</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage your customer relationships and history.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" onClick={handleExportCsv} className="h-9">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
          </Button>
          <Button size="sm" onClick={() => openDrawer("customer")} className="h-9 shadow-xs">
            <Plus className="mr-1.5 h-3.5 w-3.5" /> New Customer
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 sm:p-4 border-b gap-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 sm:w-72 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search customers..." 
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
            Showing {filteredCustomers.length} customers
          </div>
        </div>
        
        <Table className="min-w-[800px]">
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
            {filteredCustomers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground text-xs sm:text-sm">
                  No customers found. Click <span className="font-semibold text-primary cursor-pointer underline" onClick={() => openDrawer("customer")}>New Customer</span> to add one!
                </TableCell>
              </TableRow>
            ) : (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell className="font-semibold">{customer.name}</TableCell>
                  <TableCell>
                    <div className="text-xs sm:text-sm">{customer.phone}</div>
                    <div className="text-[11px] text-muted-foreground">{customer.email}</div>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">{customer.since}</TableCell>
                  <TableCell className="font-medium text-xs sm:text-sm">₹{(customer.lifetimeValue).toLocaleString('en-IN')}</TableCell>
                  <TableCell className="text-xs sm:text-sm font-medium">{customer.bookingsCount}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px] font-normal bg-muted">{tag}</Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs">{customer.assignedTo}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={() => deleteCustomer(customer.id)}
                      title="Delete Customer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
