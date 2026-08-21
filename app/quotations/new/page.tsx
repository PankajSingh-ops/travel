"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  MessageCircle, 
  Mail, 
  Download, 
  Plus, 
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";

export default function NewQuotation() {
  const [items, setItems] = useState([
    { id: 1, type: "Flights", description: "Return tickets DXB-DEL", qty: 2, price: 25000, tax: 18, total: 59000 },
    { id: 2, type: "Hotels", description: "JW Marriott 4 Nights (Double Room)", qty: 1, price: 60000, tax: 18, total: 70800 },
  ]);

  const subtotal = items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const totalTax = items.reduce((acc, item) => acc + (item.qty * item.price * (item.tax / 100)), 0);
  const total = subtotal + totalTax;

  const addItem = () => {
    setItems([...items, { id: items.length + 1, type: "Activities", description: "", qty: 1, price: 0, tax: 18, total: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/quotations">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-primary">New Quotation</h2>
            <p className="text-muted-foreground">Draft a new quotation for a customer.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline"><Save className="mr-2 h-4 w-4" /> Save Draft</Button>
          <Button variant="outline"><Eye className="mr-2 h-4 w-4" /> Preview</Button>
          <Button className="bg-success text-success-foreground hover:bg-success/90">
            <MessageCircle className="mr-2 h-4 w-4" /> Send WhatsApp
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Travel Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Customer</label>
                  <Input placeholder="Select or type customer name" defaultValue="Rahul Sharma" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Destination</label>
                  <Input placeholder="e.g. Dubai" defaultValue="Dubai" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Travel Date</label>
                  <Input placeholder="Select dates" defaultValue="Sep 12 - Sep 18, 2026" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Travelers</label>
                  <Input placeholder="e.g. 2 Adults, 1 Child" defaultValue="2 Adults" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>Itinerary & Services</CardTitle>
              <Button variant="outline" size="sm" onClick={addItem}>
                <Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[150px]">Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[80px]">Qty</TableHead>
                    <TableHead className="w-[120px]">Price (₹)</TableHead>
                    <TableHead className="w-[80px]">Tax %</TableHead>
                    <TableHead className="w-[120px]">Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue={item.type}>
                          <option>Flights</option>
                          <option>Hotels</option>
                          <option>Transfers</option>
                          <option>Activities</option>
                          <option>Meals</option>
                          <option>Visa</option>
                          <option>Other</option>
                        </select>
                      </TableCell>
                      <TableCell>
                        <Input defaultValue={item.description} />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={item.qty} />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={item.price} />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={item.tax} />
                      </TableCell>
                      <TableCell className="font-medium">
                        {(item.qty * item.price * (1 + item.tax/100)).toLocaleString('en-IN')}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-medium">₹0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span className="font-medium">₹{totalTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Advance Required</label>
                  <Input type="text" defaultValue={`₹${(total * 0.3).toLocaleString('en-IN')} (30%)`} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start"><Download className="mr-2 h-4 w-4" /> Download PDF</Button>
              <Button variant="outline" className="w-full justify-start"><Mail className="mr-2 h-4 w-4" /> Send Email</Button>
              <Button className="w-full justify-start bg-primary text-primary-foreground mt-4">Convert to Booking</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
