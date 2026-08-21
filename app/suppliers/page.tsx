"use client";

import React, { useState } from "react";
import { Search, Filter, Plus, MoreHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SUPPLIERS } from "@/lib/mock-data";

export default function SuppliersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSuppliers = SUPPLIERS.filter(sup =>
    sup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sup.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Suppliers</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage your relationships with airlines, hotels, and DMCs.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button size="sm" className="shadow-xs">
            <Plus className="mr-1.5 h-3.5 w-3.5" /> Add Supplier
          </Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card shadow-xs overflow-hidden">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-3 sm:p-4 border-b gap-3">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1 sm:w-72 sm:flex-initial">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search suppliers..." 
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
            Showing {filteredSuppliers.length} suppliers
          </div>
        </div>
        
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Supplier Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Total Business</TableHead>
              <TableHead>Outstanding</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((sup) => (
              <TableRow key={sup.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-semibold text-primary">{sup.name}</TableCell>
                <TableCell className="text-xs sm:text-sm">{sup.category}</TableCell>
                <TableCell className="text-xs">{sup.contact}</TableCell>
                <TableCell className="font-medium text-xs sm:text-sm">₹{(sup.totalBusiness).toLocaleString('en-IN')}</TableCell>
                <TableCell className={sup.outstanding > 0 ? "font-semibold text-destructive text-xs sm:text-sm" : "font-medium text-muted-foreground text-xs sm:text-sm"}>
                  ₹{(sup.outstanding).toLocaleString('en-IN')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-xs sm:text-sm">
                    <Star className="h-3.5 w-3.5 text-warning fill-warning mr-1" />
                    {sup.rating}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={sup.status === "Active" ? "success" : "secondary"} className="text-xs">
                    {sup.status}
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
