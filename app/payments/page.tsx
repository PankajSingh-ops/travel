"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Payments</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage collections, invoices and supplier payments.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export
          </Button>
          <Button size="sm" className="shadow-xs">
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
            <TableRow className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-semibold text-primary">INV-2041</TableCell>
              <TableCell className="font-medium">Rahul Sharma</TableCell>
              <TableCell className="text-primary font-medium">BK-1024</TableCell>
              <TableCell className="font-medium text-xs sm:text-sm">₹50,000</TableCell>
              <TableCell className="text-xs">UPI</TableCell>
              <TableCell><Badge variant="success" className="text-xs">Paid</Badge></TableCell>
              <TableCell className="text-xs text-muted-foreground">Aug 19, 2026</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
              </TableCell>
            </TableRow>
            <TableRow className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-semibold text-primary">INV-2038</TableCell>
              <TableCell className="font-medium">Priya Mehta</TableCell>
              <TableCell className="text-primary font-medium">BK-1025</TableCell>
              <TableCell className="font-medium text-xs sm:text-sm">₹1,20,000</TableCell>
              <TableCell className="text-xs">Bank Transfer</TableCell>
              <TableCell><Badge variant="success" className="text-xs">Paid</Badge></TableCell>
              <TableCell className="text-xs text-muted-foreground">Jul 25, 2026</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
              </TableCell>
            </TableRow>
            <TableRow className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-semibold text-primary">INV-2045</TableCell>
              <TableCell className="font-medium">Sneha Reddy</TableCell>
              <TableCell className="text-primary font-medium">BK-1030</TableCell>
              <TableCell className="font-medium text-destructive text-xs sm:text-sm">₹25,000</TableCell>
              <TableCell className="text-xs">Pending</TableCell>
              <TableCell><Badge variant="destructive" className="text-xs">Overdue</Badge></TableCell>
              <TableCell className="text-xs text-muted-foreground">Aug 15, 2026</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
