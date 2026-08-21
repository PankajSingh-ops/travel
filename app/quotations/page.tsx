"use client";

import React, { useState } from "react";
import { Search, Filter, Download, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QUOTATIONS } from "@/lib/mock-data";
import { exportToCsv } from "@/lib/export-csv";
import Link from "next/link";

export default function QuotationsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredQuotes = QUOTATIONS.filter(quote => 
    quote.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportCsv = () => {
    exportToCsv("quotations_report", filteredQuotes, [
      { header: "Quotation ID", key: "id" },
      { header: "Customer Name", key: "customerName" },
      { header: "Destination", key: "destination" },
      { header: "Quotation Amount (INR)", key: "amount", format: (v) => `₹${Number(v).toLocaleString('en-IN')}` },
      { header: "Date Created", key: "date" },
      { header: "Status", key: "status" },
    ]);
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Quotations</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage your sent and drafted quotations.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" onClick={handleExportCsv} className="h-9">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export CSV
          </Button>
          <Link href="/quotations/new">
            <Button size="sm" className="h-9 shadow-xs">
              <Plus className="mr-1.5 h-3.5 w-3.5" /> New Quotation
            </Button>
          </Link>
        </div>
      </div>

      <div className="rounded-lg border bg-card shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 sm:p-4 border-b gap-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 sm:w-72 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search quotations..." 
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
            Showing {filteredQuotes.length} quotations
          </div>
        </div>
        
        <Table className="min-w-[750px]">
          <TableHeader>
            <TableRow>
              <TableHead>Quotation ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Package</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date Created</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredQuotes.map((quote) => (
              <TableRow key={quote.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-semibold text-primary">{quote.id}</TableCell>
                <TableCell className="font-medium">{quote.customerName}</TableCell>
                <TableCell>{quote.destination}</TableCell>
                <TableCell className="font-medium">₹{(quote.amount).toLocaleString('en-IN')}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{quote.date}</TableCell>
                <TableCell>
                  <Badge variant={quote.status === "Sent" ? "success" : "secondary"} className="text-xs">
                    {quote.status}
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
