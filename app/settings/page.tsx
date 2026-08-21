"use client";

import React from "react";
import { Building, Users, MessageCircle, CreditCard, Puzzle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Settings</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Manage your organization, users, and integrations.</p>
        </div>
      </div>

      <div className="mt-4 sm:mt-6">
        <Tabs defaultValue="organization" className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-60 shrink-0">
            {/* Horizontal scrollable on mobile, vertical stack on desktop */}
            <div className="overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
              <TabsList className="flex flex-row md:flex-col h-auto bg-transparent items-stretch w-max md:w-full space-x-1 md:space-x-0 md:space-y-1 p-0">
                <TabsTrigger value="organization" className="justify-start px-3 py-2 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-md">
                  <Building className="mr-2 h-4 w-4 shrink-0" /> Organization
                </TabsTrigger>
                <TabsTrigger value="users" className="justify-start px-3 py-2 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-md">
                  <Users className="mr-2 h-4 w-4 shrink-0" /> Users & Roles
                </TabsTrigger>
                <TabsTrigger value="whatsapp" className="justify-start px-3 py-2 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-md">
                  <MessageCircle className="mr-2 h-4 w-4 shrink-0" /> WhatsApp
                </TabsTrigger>
                <TabsTrigger value="billing" className="justify-start px-3 py-2 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-md">
                  <CreditCard className="mr-2 h-4 w-4 shrink-0" /> Billing & Tax
                </TabsTrigger>
                <TabsTrigger value="integrations" className="justify-start px-3 py-2 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-md">
                  <Puzzle className="mr-2 h-4 w-4 shrink-0" /> Integrations
                </TabsTrigger>
                <TabsTrigger value="security" className="justify-start px-3 py-2 text-xs sm:text-sm whitespace-nowrap data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none rounded-md">
                  <Shield className="mr-2 h-4 w-4 shrink-0" /> Security
                </TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <div className="flex-1 max-w-4xl min-w-0">
            <TabsContent value="organization" className="m-0 space-y-6 focus-visible:outline-none focus-visible:ring-0">
              <Card className="shadow-xs">
                <CardHeader className="p-4 sm:p-6 pb-3">
                  <CardTitle className="text-base sm:text-lg">Organization Details</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Basic information about your travel agency.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                  <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-medium">Organization Name</label>
                      <Input defaultValue="Skyline Travels" className="h-9 text-xs sm:text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-medium">Website</label>
                      <Input defaultValue="www.skylinetravels.com" className="h-9 text-xs sm:text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-medium">Contact Email</label>
                      <Input defaultValue="info@skylinetravels.com" className="h-9 text-xs sm:text-sm" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-medium">Phone Number</label>
                      <Input defaultValue="+91 1800 123 4567" className="h-9 text-xs sm:text-sm" />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <label className="text-xs sm:text-sm font-medium">Address</label>
                      <Input defaultValue="123 Business Park, Cyber Hub, Gurugram, India" className="h-9 text-xs sm:text-sm" />
                    </div>
                  </div>
                  <div className="pt-3 border-t flex justify-end">
                    <Button size="sm" className="h-9">Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="whatsapp" className="m-0 space-y-6 focus-visible:outline-none focus-visible:ring-0">
              <Card className="shadow-xs">
                <CardHeader className="p-4 sm:p-6 pb-3">
                  <CardTitle className="text-base sm:text-lg">WhatsApp Business API</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">Manage your WhatsApp Cloud API connection.</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0 space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border rounded-lg bg-success/5 border-success/20 gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                        <MessageCircle className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <h4 className="font-medium text-xs sm:text-sm">Connected</h4>
                        <p className="text-xs text-muted-foreground">Number: +91 98765 43210</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10 h-8 text-xs self-end sm:self-auto">
                      Disconnect
                    </Button>
                  </div>
                  
                  <div className="pt-2 space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs sm:text-sm font-medium">Webhook URL</label>
                      <div className="flex gap-2 flex-col sm:flex-row">
                        <Input readOnly defaultValue="https://api.tripflow.com/v1/webhooks/whatsapp" className="bg-muted h-9 text-xs sm:text-sm" />
                        <Button variant="outline" size="sm" className="h-9 shrink-0">Copy</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="m-0 min-h-[300px] flex items-center justify-center border rounded-lg bg-card p-6">
              <div className="text-center">
                <Users className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3" />
                <h3 className="text-base sm:text-lg font-medium">User Management</h3>
                <p className="text-muted-foreground text-xs sm:text-sm max-w-sm mt-1">Manage roles, permissions, and invite team members.</p>
              </div>
            </TabsContent>

            <TabsContent value="billing" className="m-0 min-h-[300px] flex items-center justify-center border rounded-lg bg-card p-6">
              <div className="text-center">
                <CreditCard className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3" />
                <h3 className="text-base sm:text-lg font-medium">Billing & Invoicing</h3>
                <p className="text-muted-foreground text-xs sm:text-sm max-w-sm mt-1">Manage subscription plans, tax GST settings, and invoices.</p>
              </div>
            </TabsContent>

            <TabsContent value="integrations" className="m-0 min-h-[300px] flex items-center justify-center border rounded-lg bg-card p-6">
              <div className="text-center">
                <Puzzle className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3" />
                <h3 className="text-base sm:text-lg font-medium">Third-party Integrations</h3>
                <p className="text-muted-foreground text-xs sm:text-sm max-w-sm mt-1">Connect GDS, Stripe, Razorpay, and Email gateways.</p>
              </div>
            </TabsContent>

            <TabsContent value="security" className="m-0 min-h-[300px] flex items-center justify-center border rounded-lg bg-card p-6">
              <div className="text-center">
                <Shield className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground mb-3" />
                <h3 className="text-base sm:text-lg font-medium">Security & Privacy</h3>
                <p className="text-muted-foreground text-xs sm:text-sm max-w-sm mt-1">Two-factor authentication, audit logs, and session controls.</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
