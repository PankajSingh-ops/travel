"use client";

import React from "react";
import { Search, Filter, Download, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { QUOTATIONS } from "@/lib/mock-data";
import Link from "next/link";

export default function QuotationsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Quotations</h2>
          <p className="text-muted-foreground">Manage your sent and drafted quotations.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export</Button>
          <Link href="/quotations/new">
            <Button><Plus className="mr-2 h-4 w-4" /> New Quotation</Button>
          </Link>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search quotations..." className="pl-8" />
            </div>
            <Button variant="outline" size="sm" className="h-10"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          </div>
        </div>
        
        <Table>
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
            {QUOTATIONS.map((quote) => (
              <TableRow key={quote.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium text-primary">{quote.id}</TableCell>
                <TableCell className="font-medium">{quote.customerName}</TableCell>
                <TableCell>{quote.destination}</TableCell>
                <TableCell className="font-medium">₹{(quote.amount).toLocaleString('en-IN')}</TableCell>
                <TableCell>{quote.date}</TableCell>
                <TableCell>
                  <Badge variant={quote.status === "Sent" ? "success" : "secondary"}>
                    {quote.status}
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
