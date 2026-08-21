"use client";

import React from "react";
import { Download, TrendingUp, Users, Target, MousePointerClick } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { exportToCsv } from "@/lib/export-csv";

const SOURCE_DATA = [
  { name: "WhatsApp", value: 45, color: "#10b981" },
  { name: "Website", value: 25, color: "#3b82f6" },
  { name: "Instagram", value: 20, color: "#ec4899" },
  { name: "Referral", value: 10, color: "#8b5cf6" },
];

const DESTINATION_DATA = [
  { name: "Dubai", revenue: 85 },
  { name: "Maldives", revenue: 45 },
  { name: "Bali", revenue: 35 },
  { name: "Kashmir", revenue: 18 },
  { name: "Europe", revenue: 62 },
];

export default function AnalyticsPage() {
  const handleExportReport = () => {
    // Generate combined analytics dataset
    const reportData = [
      // KPI summary
      { Section: "KPI Summary", Metric: "Average Deal Size", Value: "₹1,40,000", Notes: "+4% from last month" },
      { Section: "KPI Summary", Metric: "Customer Acquisition Cost (CAC)", Value: "₹850", Notes: "Target: < ₹1,000" },
      { Section: "KPI Summary", Metric: "Lead Conversion Win Rate", Value: "24.5%", Notes: "+2.1% from last month" },
      { Section: "KPI Summary", Metric: "Campaign Link Clicks", Value: "12,450", Notes: "Across all marketing campaigns" },
      // Destination Performance
      ...DESTINATION_DATA.map(d => ({
        Section: "Destination Performance",
        Metric: d.name,
        Value: `₹${d.revenue} Lakhs`,
        Notes: `Revenue share`
      })),
      // Lead Sources
      ...SOURCE_DATA.map(s => ({
        Section: "Lead Acquisition Source",
        Metric: s.name,
        Value: `${s.value}%`,
        Notes: `Inquiry channel share`
      }))
    ];

    exportToCsv("analytics_report", reportData, [
      { header: "Report Section", key: "Section" },
      { header: "Metric / Category", key: "Metric" },
      { header: "Value", key: "Value" },
      { header: "Notes / Context", key: "Notes" }
    ]);
  };

  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Analytics</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Detailed insights into your business performance.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button variant="outline" size="sm" onClick={handleExportReport} className="h-9">
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export Report (CSV)
          </Button>
        </div>
      </div>

      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Avg. Deal Size</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl font-bold">₹1.4L</div>
            <p className="text-[11px] sm:text-xs text-success font-medium mt-1">+4% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">CAC</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl font-bold">₹850</div>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">Customer Acquisition Cost</p>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl font-bold">24.5%</div>
            <p className="text-[11px] sm:text-xs text-success font-medium mt-1">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-xs">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium text-muted-foreground">Link Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-xl sm:text-2xl font-bold">12,450</div>
            <p className="text-[11px] sm:text-xs text-muted-foreground mt-1">Across all campaigns</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="shadow-xs">
          <CardHeader className="p-4 sm:p-6 pb-2">
            <CardTitle className="text-base sm:text-lg">Revenue by Destination (in Lakhs)</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Performance of top selling destinations.</CardDescription>
          </CardHeader>
          <CardContent className="p-2 sm:p-6 pt-0 h-[260px] sm:h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DESTINATION_DATA} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
                <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${v}L`} />
                <Tooltip cursor={{fill: 'var(--color-muted)'}} contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }} />
                <Bar dataKey="revenue" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-xs">
          <CardHeader className="p-4 sm:p-6 pb-2">
            <CardTitle className="text-base sm:text-lg">Leads by Source</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Where your inquiries are originating from.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0 min-h-[260px] sm:min-h-[300px] flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="h-[180px] sm:h-[220px] w-full max-w-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={SOURCE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {SOURCE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-row flex-wrap sm:flex-col gap-2.5 sm:gap-3 justify-center">
              {SOURCE_DATA.map(source => (
                <div key={source.name} className="flex items-center gap-2 text-xs sm:text-sm min-w-[120px]">
                  <div className="h-3 w-3 rounded-full shrink-0" style={{ backgroundColor: source.color }} />
                  <span className="text-muted-foreground">{source.name}</span>
                  <span className="font-semibold ml-auto">{source.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
