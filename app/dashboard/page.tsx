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
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Good morning, Rahul</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Here's what's happening with your travel business today.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm" className="shadow-xs">
            <Plus className="mr-2 h-4 w-4" />
            New Lead
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Total Sales</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">₹28.4L</div>
            <p className="flex items-center text-xs text-success font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
              +18.6% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">New Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">248</div>
            <p className="flex items-center text-xs text-success font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
              +12.4% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Confirmed Bookings</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">84</div>
            <p className="flex items-center text-xs text-success font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
              +9.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold text-destructive">₹6.2L</div>
            <p className="flex items-center text-xs text-muted-foreground mt-1">
              12 invoices overdue
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">18.7%</div>
            <p className="flex items-center text-xs text-success font-medium mt-1">
              <ArrowUpRight className="mr-1 h-3.5 w-3.5" />
              +2.4% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Expected Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">₹11.8L</div>
            <p className="flex items-center text-xs text-muted-foreground mt-1">
              From active opportunities
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts & Funnel Grid */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4 shadow-xs">
          <CardHeader className="p-4 sm:p-6 pb-2">
            <CardTitle className="text-base sm:text-lg">Revenue Overview</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Your business performance across all destinations.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-6 pt-0">
            <Tabs defaultValue="revenue" className="w-full">
              <div className="overflow-x-auto scrollbar-hide py-1">
                <TabsList className="mb-4">
                  <TabsTrigger value="revenue" className="text-xs sm:text-sm">Revenue</TabsTrigger>
                  <TabsTrigger value="bookings" className="text-xs sm:text-sm">Bookings</TabsTrigger>
                  <TabsTrigger value="profit" className="text-xs sm:text-sm">Profit</TabsTrigger>
                  <TabsTrigger value="leads" className="text-xs sm:text-sm">Leads</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="revenue" className="h-[280px] sm:h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis 
                      stroke="var(--color-muted-foreground)" 
                      fontSize={11} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `₹${value / 100000}L`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }}
                      itemStyle={{ color: 'var(--color-foreground)' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorRevenue)" />
                  </AreaChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="col-span-1 lg:col-span-3 shadow-xs">
          <CardHeader className="p-4 sm:p-6 pb-2">
            <CardTitle className="text-base sm:text-lg">Sales Funnel</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Lead conversion tracking this month.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-2">
            <div className="space-y-4 sm:space-y-5">
              {[
                { stage: "New Leads", count: 248, amount: "₹4.2Cr", color: "bg-blue-500", percent: "100%" },
                { stage: "Contacted", count: 182, amount: "₹3.1Cr", color: "bg-indigo-500", percent: "73%" },
                { stage: "Req. Collected", count: 145, amount: "₹2.8Cr", color: "bg-purple-500", percent: "58%" },
                { stage: "Quotation Sent", count: 112, amount: "₹2.1Cr", color: "bg-pink-500", percent: "45%" },
                { stage: "Negotiation", count: 64, amount: "₹1.1Cr", color: "bg-orange-500", percent: "25%" },
                { stage: "Advance Paid", count: 42, amount: "₹72L", color: "bg-amber-500", percent: "16%" },
                { stage: "Booked", count: 38, amount: "₹65L", color: "bg-success", percent: "15%" },
              ].map((step, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <div className="flex items-center justify-between sm:w-[120px] text-xs sm:text-sm font-medium">
                    <span>{step.stage}</span>
                    <span className="sm:hidden text-xs text-muted-foreground">{step.count} ({step.amount})</span>
                  </div>
                  <div className="flex-1 py-1">
                    <div className="h-3 sm:h-3.5 w-full rounded-full bg-muted overflow-hidden">
                      <div 
                        className={`h-full ${step.color} transition-all rounded-full`} 
                        style={{ width: step.percent }}
                      ></div>
                    </div>
                  </div>
                  <div className="hidden sm:block w-[50px] text-right text-xs text-muted-foreground">{step.count}</div>
                  <div className="hidden sm:block w-[70px] text-right text-xs font-semibold">{step.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
