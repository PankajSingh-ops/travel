"use client";

import React from "react";
import { Building, Users, Lock, MessageCircle, Bell, CreditCard, Puzzle, Database, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">Settings</h2>
          <p className="text-muted-foreground">Manage your organization, users, and integrations.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <Tabs defaultValue="organization" className="flex-1 flex flex-col md:flex-row gap-6" orientation="vertical">
          <div className="w-full md:w-64 shrink-0">
            <TabsList className="flex flex-col h-auto bg-transparent items-stretch w-full space-y-1 p-0">
              <TabsTrigger value="organization" className="justify-start px-4 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
                <Building className="mr-2 h-4 w-4" /> Organization
              </TabsTrigger>
              <TabsTrigger value="users" className="justify-start px-4 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
                <Users className="mr-2 h-4 w-4" /> Users & Roles
              </TabsTrigger>
              <TabsTrigger value="whatsapp" className="justify-start px-4 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
                <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
              </TabsTrigger>
              <TabsTrigger value="billing" className="justify-start px-4 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
                <CreditCard className="mr-2 h-4 w-4" /> Billing & Tax
              </TabsTrigger>
              <TabsTrigger value="integrations" className="justify-start px-4 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
                <Puzzle className="mr-2 h-4 w-4" /> Integrations
              </TabsTrigger>
              <TabsTrigger value="security" className="justify-start px-4 py-2.5 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:shadow-none">
                <Shield className="mr-2 h-4 w-4" /> Security
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 max-w-4xl">
            <TabsContent value="organization" className="m-0 space-y-6 focus-visible:outline-none focus-visible:ring-0">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Details</CardTitle>
                  <CardDescription>Basic information about your travel agency.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Organization Name</label>
                      <Input defaultValue="Skyline Travels" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Website</label>
                      <Input defaultValue="www.skylinetravels.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Contact Email</label>
                      <Input defaultValue="info@skylinetravels.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Phone Number</label>
                      <Input defaultValue="+91 1800 123 4567" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium">Address</label>
                      <Input defaultValue="123 Business Park, Cyber Hub, Gurugram, India" />
                    </div>
                  </div>
                  <div className="pt-4 border-t flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="whatsapp" className="m-0 space-y-6 focus-visible:outline-none focus-visible:ring-0">
              <Card>
                <CardHeader>
                  <CardTitle>WhatsApp Business API</CardTitle>
                  <CardDescription>Manage your WhatsApp Cloud API connection.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg bg-success/5 border-success/20">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-success/20 flex items-center justify-center">
                        <MessageCircle className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <h4 className="font-medium">Connected</h4>
                        <p className="text-sm text-muted-foreground">Number: +91 98765 43210</p>
                      </div>
                    </div>
                    <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">Disconnect</Button>
                  </div>
                  
                  <div className="pt-4 space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Webhook URL</label>
                      <div className="flex gap-2">
                        <Input readOnly defaultValue="https://api.tripflow.com/v1/webhooks/whatsapp" className="bg-muted" />
                        <Button variant="outline">Copy</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Empty states for other tabs */}
            <TabsContent value="users" className="m-0 h-[400px] flex items-center justify-center border rounded-lg bg-card">
              <div className="text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">User Management</h3>
                <p className="text-muted-foreground text-sm max-w-sm mt-1">Manage roles, permissions, and invite team members.</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
