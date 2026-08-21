"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { INVOICES } from "@/lib/mock-data";
import { exportToCsv } from "@/lib/export-csv";

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInvoices = INVOICES.filter(inv =>
    inv.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCsv = () => {
    exportToCsv("invoices_report", filteredInvoices, [
      { header: "Invoice ID", key: "id" },
      { header: "Customer Name", key: "customer" },
      { header: "Booking Reference", key: "bookingId" },
      { header: "Invoice Amount (INR)", key: "amount", format: (v) => `₹${Number(v).toLocaleString('en-IN')}` },
      { header: "Issue Date", key: "issueDate" },
      { header: "Due Date", key: "dueDate" },
      { header: "Status", key: "status" },
    ]);
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Invoices</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage billing and issued invoices for customers.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" onClick={handleExportCsv} className="h-9">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
          </Button>
          <Button size="sm" className="h-9 shadow-xs">
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Create Invoice
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 sm:p-4 border-b gap-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 sm:w-72 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search invoices..." 
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
            Showing {filteredInvoices.length} invoices
          </div>
        </div>
        
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Invoice ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Booking ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Issue Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInvoices.map((invoice) => (
              <TableRow key={invoice.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-semibold text-primary">{invoice.id}</TableCell>
                <TableCell className="font-medium">{invoice.customer}</TableCell>
                <TableCell className="text-xs">{invoice.bookingId}</TableCell>
                <TableCell className="font-medium text-xs sm:text-sm">₹{(invoice.amount).toLocaleString('en-IN')}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{invoice.issueDate}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{invoice.dueDate}</TableCell>
                <TableCell>
                  <Badge 
                    variant={invoice.status === "Paid" ? "success" : invoice.status === "Partially Paid" ? "warning" : "secondary"}
                    className="text-xs"
                  >
                    {invoice.status}
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
