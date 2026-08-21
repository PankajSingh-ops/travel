"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { exportToCsv } from "@/lib/export-csv";

const PAYMENTS_DATA = [
  { invoice: "INV-2041", customer: "Rahul Sharma", bookingId: "BK-1024", amount: 50000, method: "UPI", status: "Paid", date: "Aug 19, 2026" },
  { invoice: "INV-2038", customer: "Priya Mehta", bookingId: "BK-1025", amount: 120000, method: "Bank Transfer", status: "Paid", date: "Jul 25, 2026" },
  { invoice: "INV-2045", customer: "Sneha Reddy", bookingId: "BK-1030", amount: 25000, method: "Pending", status: "Overdue", date: "Aug 15, 2026" },
];

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = PAYMENTS_DATA.filter(p =>
    p.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.invoice.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.bookingId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCsv = () => {
    exportToCsv("payments_report", filteredPayments, [
      { header: "Invoice Number", key: "invoice" },
      { header: "Customer Name", key: "customer" },
      { header: "Booking Reference", key: "bookingId" },
      { header: "Amount (INR)", key: "amount", format: (v) => `₹${Number(v).toLocaleString('en-IN')}` },
      { header: "Payment Method", key: "method" },
      { header: "Payment Status", key: "status" },
      { header: "Transaction Date", key: "date" },
    ]);
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Payments</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage collections, invoices and supplier payments.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" onClick={handleExportCsv} className="h-9">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
          </Button>
          <Button size="sm" className="h-9 shadow-xs">
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Record Payment
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="shadow-xs">
          <CardHeader className="p-4 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm text-muted-foreground">Total Receivable</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-primary">₹14.2L</div>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardHeader className="p-4 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm text-muted-foreground">Collected This Month</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-success">₹8.5L</div>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardHeader className="p-4 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-destructive">₹2.1L</div>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardHeader className="p-4 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm text-muted-foreground">Supplier Payables</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xl sm:text-2xl font-bold text-warning">₹6.4L</div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg border bg-card shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 sm:p-4 border-b gap-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 sm:w-72 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search payments..." 
                className="pl-8 text-xs sm:text-sm h-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 shrink-0">
              <Filter className="mr-1.5 h-3.5 w-3.5" /> Filters
            </Button>
          </div>
        </div>
        
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Invoice</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Booking ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.map((p, idx) => (
              <TableRow key={idx} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-semibold text-primary">{p.invoice}</TableCell>
                <TableCell className="font-medium">{p.customer}</TableCell>
                <TableCell className="text-primary font-medium">{p.bookingId}</TableCell>
                <TableCell className={`font-medium text-xs sm:text-sm ${p.status === "Overdue" ? "text-destructive" : ""}`}>
                  ₹{p.amount.toLocaleString('en-IN')}
                </TableCell>
                <TableCell className="text-xs">{p.method}</TableCell>
                <TableCell>
                  <Badge variant={p.status === "Paid" ? "success" : "destructive"} className="text-xs">
                    {p.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{p.date}</TableCell>
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
