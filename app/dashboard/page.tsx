"use client";

import React from "react";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  IndianRupee, 
  Users, 
  Briefcase, 
  Clock, 
  Target, 
  TrendingUp,
  Download,
  Plus
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const REVENUE_DATA = [
  { name: "Jan", revenue: 400000 },
  { name: "Feb", revenue: 300000 },
  { name: "Mar", revenue: 200000 },
  { name: "Apr", revenue: 278000 },
  { name: "May", revenue: 189000 },
  { name: "Jun", revenue: 239000 },
  { name: "Jul", revenue: 349000 },
  { name: "Aug", revenue: 500000 },
  { name: "Sep", revenue: 600000 },
  { name: "Oct", revenue: 700000 },
  { name: "Nov", revenue: 800000 },
  { name: "Dec", revenue: 950000 },
];

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Good morning, Rahul</h2>
          <p className="text-muted-foreground">
            Here's what's happening with your travel business today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Lead
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹28.4L</div>
            <p className="flex items-center text-xs text-success">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +18.6% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">New Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="flex items-center text-xs text-success">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +12.4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Confirmed Bookings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84</div>
            <p className="flex items-center text-xs text-success">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +9.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">₹6.2L</div>
            <p className="flex items-center text-xs text-muted-foreground">
              12 invoices overdue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.7%</div>
            <p className="flex items-center text-xs text-success">
              <ArrowUpRight className="mr-1 h-3 w-3" />
              +2.4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Expected Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹11.8L</div>
            <p className="flex items-center text-xs text-muted-foreground">
              From active opportunities
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Your business performance across all destinations.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <Tabs defaultValue="revenue" className="w-full">
              <TabsList className="mb-4 ml-4">
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
                <TabsTrigger value="bookings">Bookings</TabsTrigger>
                <TabsTrigger value="profit">Profit</TabsTrigger>
                <TabsTrigger value="leads">Leads</TabsTrigger>
              </TabsList>
              <TabsContent value="revenue" className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis 
                      stroke="var(--color-muted-foreground)" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `₹${value / 100000}L`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--color-foreground)' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Sales Funnel</CardTitle>
            <CardDescription>
              Lead conversion tracking this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { stage: "New Leads", count: 248, amount: "₹4.2Cr", color: "bg-blue-500", percent: "100%" },
                { stage: "Contacted", count: 182, amount: "₹3.1Cr", color: "bg-indigo-500", percent: "73%" },
                { stage: "Requirement Collected", count: 145, amount: "₹2.8Cr", color: "bg-purple-500", percent: "58%" },
                { stage: "Quotation Sent", count: 112, amount: "₹2.1Cr", color: "bg-pink-500", percent: "45%" },
                { stage: "Negotiation", count: 64, amount: "₹1.1Cr", color: "bg-orange-500", percent: "25%" },
                { stage: "Advance Paid", count: 42, amount: "₹72L", color: "bg-amber-500", percent: "16%" },
                { stage: "Booked", count: 38, amount: "₹65L", color: "bg-success", percent: "15%" },
              ].map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="w-[120px] text-sm font-medium">{step.stage}</div>
                  <div className="flex-1 px-4">
                    <div className="h-4 w-full rounded-full bg-muted overflow-hidden">
                      <div 
                        className={`h-full ${step.color} transition-all`} 
                        style={{ width: step.percent }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-[80px] text-right text-sm text-muted-foreground">{step.count}</div>
                  <div className="w-[80px] text-right text-sm font-medium">{step.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
