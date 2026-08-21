"use client";

import React from "react";
import { Search, Filter, Download, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PaymentsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Payments</h2>
          <p className="text-muted-foreground">Manage collections, invoices and supplier payments.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
          <Button><Plus className="mr-2 h-4 w-4" /> Record Payment</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Receivable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">₹14.2L</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Collected This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">₹8.5L</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Overdue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">₹2.1L</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Supplier Payables</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">₹6.4L</div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search payments..." className="pl-8" />
            </div>
            <Button variant="outline" size="sm" className="h-10"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          </div>
        </div>
        
        <Table>
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
              <TableCell className="font-medium">INV-2041</TableCell>
              <TableCell>Rahul Sharma</TableCell>
              <TableCell className="text-primary">BK-1024</TableCell>
              <TableCell className="font-medium">₹50,000</TableCell>
              <TableCell>UPI</TableCell>
              <TableCell><Badge variant="success">Paid</Badge></TableCell>
              <TableCell>Aug 19, 2026</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
              </TableCell>
            </TableRow>
            <TableRow className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-medium">INV-2038</TableCell>
              <TableCell>Priya Mehta</TableCell>
              <TableCell className="text-primary">BK-1025</TableCell>
              <TableCell className="font-medium">₹1,20,000</TableCell>
              <TableCell>Bank Transfer</TableCell>
              <TableCell><Badge variant="success">Paid</Badge></TableCell>
              <TableCell>Jul 25, 2026</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
              </TableCell>
            </TableRow>
            <TableRow className="cursor-pointer hover:bg-muted/50">
              <TableCell className="font-medium">INV-2045</TableCell>
              <TableCell>Sneha Reddy</TableCell>
              <TableCell className="text-primary">BK-1030</TableCell>
              <TableCell className="font-medium text-destructive">₹25,000</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell><Badge variant="destructive">Overdue</Badge></TableCell>
              <TableCell>Aug 15, 2026</TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
