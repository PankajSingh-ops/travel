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
  Trash2,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCRM } from "@/lib/crm-store";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NewQuotation() {
  const router = useRouter();
  const { addQuotation, addBooking } = useCRM();

  const [customerName, setCustomerName] = useState("Rahul Sharma");
  const [destination, setDestination] = useState("Dubai Premium Escape");
  const [travelDates, setTravelDates] = useState("Sep 12 - Sep 18, 2026");
  const [travelers, setTravelers] = useState("2 Adults");
  const [isSuccess, setIsSuccess] = useState(false);

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

  const handleSaveQuotation = (status: "Draft" | "Sent" = "Sent") => {
    addQuotation({
      customerName: customerName || "Rahul Sharma",
      destination: destination || "Custom Tour",
      amount: total,
      status: status,
    });
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/quotations");
    }, 600);
  };

  const handleConvertToBooking = () => {
    addBooking({
      customerName: customerName || "Rahul Sharma",
      destination: destination || "Custom Tour",
      travelDates: travelDates,
      travelers: travelers,
      amount: total,
      paid: Math.round(total * 0.3),
      pending: Math.round(total * 0.7),
      status: "Partially Paid",
      assignedTo: "Amit",
    });
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/bookings");
    }, 600);
  };

  return (
    <div className="flex-1 space-y-4 sm:space-y-6 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/quotations">
            <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">New Quotation</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Draft a new quotation for a customer.</p>
          </div>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          <Button variant="outline" size="sm" onClick={() => handleSaveQuotation("Draft")} className="h-9">
            <Save className="mr-1.5 h-3.5 w-3.5" /> Save Draft
          </Button>
          <Button size="sm" onClick={() => handleSaveQuotation("Sent")} className="h-9 bg-success text-success-foreground hover:bg-success/90">
            <MessageCircle className="mr-1.5 h-3.5 w-3.5" /> Send & Save
          </Button>
        </div>
      </div>

      {isSuccess && (
        <div className="bg-success/10 border border-success/20 text-success p-3 rounded-lg flex items-center gap-2 text-xs sm:text-sm font-medium animate-in fade-in">
          <Check className="h-4 w-4" /> Quotation saved successfully! Redirecting...
        </div>
      )}

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-xs">
            <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-4">
              <CardTitle className="text-base sm:text-lg">Travel Details</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-medium">Customer Name</label>
                  <Input 
                    placeholder="Select or type customer name" 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)} 
                    className="h-9 text-xs sm:text-sm" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-medium">Destination</label>
                  <Input 
                    placeholder="e.g. Dubai" 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)} 
                    className="h-9 text-xs sm:text-sm" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-medium">Travel Date</label>
                  <Input 
                    placeholder="Select dates" 
                    value={travelDates} 
                    onChange={(e) => setTravelDates(e.target.value)} 
                    className="h-9 text-xs sm:text-sm" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs sm:text-sm font-medium">Travelers</label>
                  <Input 
                    placeholder="e.g. 2 Adults, 1 Child" 
                    value={travelers} 
                    onChange={(e) => setTravelers(e.target.value)} 
                    className="h-9 text-xs sm:text-sm" 
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xs overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6 pb-3">
              <CardTitle className="text-base sm:text-lg">Itinerary & Services</CardTitle>
              <Button variant="outline" size="sm" onClick={addItem} className="h-8 text-xs">
                <Plus className="mr-1 h-3.5 w-3.5" /> Add Item
              </Button>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              <Table className="min-w-[680px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[130px]">Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[70px]">Qty</TableHead>
                    <TableHead className="w-[110px]">Price (₹)</TableHead>
                    <TableHead className="w-[70px]">Tax %</TableHead>
                    <TableHead className="w-[110px]">Total</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <select className="w-full rounded-md border border-input bg-background px-2.5 py-1.5 text-xs sm:text-sm" defaultValue={item.type}>
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
                        <Input defaultValue={item.description} className="h-8 text-xs sm:text-sm" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={item.qty} className="h-8 text-xs sm:text-sm text-center" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={item.price} className="h-8 text-xs sm:text-sm" />
                      </TableCell>
                      <TableCell>
                        <Input type="number" defaultValue={item.tax} className="h-8 text-xs sm:text-sm text-center" />
                      </TableCell>
                      <TableCell className="font-medium text-xs sm:text-sm">
                        ₹{(item.qty * item.price * (1 + item.tax/100)).toLocaleString('en-IN')}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)} className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10">
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
          <Card className="shadow-xs">
            <CardHeader className="p-4 sm:p-6 pb-3">
              <CardTitle className="text-base sm:text-lg">Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="font-medium">₹0</span>
                </div>
                <div className="flex justify-between text-xs sm:text-sm">
                  <span className="text-muted-foreground">Taxes & Fees</span>
                  <span className="font-medium">₹{totalTax.toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-base sm:text-lg">
                  <span>Total</span>
                  <span className="text-primary">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="pt-2 space-y-1.5">
                <label className="text-xs sm:text-sm font-medium text-muted-foreground">Advance Required</label>
                <Input type="text" defaultValue={`₹${(total * 0.3).toLocaleString('en-IN')} (30%)`} className="h-9 text-xs sm:text-sm" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xs">
            <CardHeader className="p-4 sm:p-6 pb-3">
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0 space-y-2">
              <Button variant="outline" className="w-full justify-start text-xs sm:text-sm h-9">
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs sm:text-sm h-9">
                <Mail className="mr-2 h-4 w-4" /> Send Email
              </Button>
              <Button onClick={handleConvertToBooking} className="w-full justify-start bg-primary text-primary-foreground mt-3 text-xs sm:text-sm h-9">
                Convert to Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
