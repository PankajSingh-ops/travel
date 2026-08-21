"use client";

import React from "react";
import { Search, Filter, Plus, MoreHorizontal, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SUPPLIERS } from "@/lib/mock-data";

export default function SuppliersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Suppliers</h2>
          <p className="text-muted-foreground">Manage your relationships with airlines, hotels, and DMCs.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button><Plus className="mr-2 h-4 w-4" /> Add Supplier</Button>
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search suppliers..." className="pl-8" />
            </div>
            <Button variant="outline" size="sm" className="h-10"><Filter className="mr-2 h-4 w-4" /> Filters</Button>
          </div>
        </div>
        
        <Table>
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
            {SUPPLIERS.map((sup) => (
              <TableRow key={sup.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium text-primary">{sup.name}</TableCell>
                <TableCell>{sup.category}</TableCell>
                <TableCell className="text-sm">{sup.contact}</TableCell>
                <TableCell className="font-medium">₹{(sup.totalBusiness).toLocaleString('en-IN')}</TableCell>
                <TableCell className={sup.outstanding > 0 ? "font-medium text-destructive" : "font-medium text-muted-foreground"}>
                  ₹{(sup.outstanding).toLocaleString('en-IN')}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-warning fill-warning mr-1" />
                    {sup.rating}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={sup.status === "Active" ? "success" : "secondary"}>
                    {sup.status}
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
