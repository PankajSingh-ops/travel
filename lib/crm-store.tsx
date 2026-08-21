"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  CUSTOMERS as INITIAL_CUSTOMERS,
  LEADS as INITIAL_LEADS,
  BOOKINGS as INITIAL_BOOKINGS,
  QUOTATIONS as INITIAL_QUOTATIONS,
  PACKAGES as INITIAL_PACKAGES,
  DESTINATIONS as INITIAL_DESTINATIONS,
  SUPPLIERS as INITIAL_SUPPLIERS,
  INVOICES as INITIAL_INVOICES,
  EXPENSES as INITIAL_EXPENSES,
} from "./mock-data";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  since: string;
  lifetimeValue: number;
  bookingsCount: number;
  tags: string[];
  assignedTo: string;
}

export interface Lead {
  id: string;
  customerName: string;
  customerId?: string;
  phone: string;
  destination: string;
  travelDates: string;
  travelers: string;
  budget: number;
  source: string;
  stage: string;
  assignedTo: string;
  potentialValue: number;
  lastActivity: string;
  created: string;
  score: "HOT" | "WARM" | "COLD";
  notes?: string;
}

export interface Booking {
  id: string;
  customerName: string;
  destination: string;
  travelDates: string;
  travelers: string;
  amount: number;
  paid: number;
  pending: number;
  profit: number;
  status: "Confirmed" | "Partially Paid" | "Completed" | "Cancelled";
  assignedTo: string;
  created: string;
}

export interface Quotation {
  id: string;
  customerName: string;
  destination: string;
  amount: number;
  date: string;
  status: "Draft" | "Sent" | "Accepted" | "Rejected";
}

export interface Package {
  id: string;
  name: string;
  duration: string;
  startingPrice: number;
  bookings: number;
  revenue: number;
  status: "Active" | "Inactive";
}

export interface Destination {
  id: string;
  name: string;
  activePackages: number;
  totalLeads: number;
  bookings: number;
  revenue: number;
  status: "Active" | "Seasonal";
}

export interface Supplier {
  id: string;
  name: string;
  category: "Airline" | "Hotel" | "Activity" | "DMC" | "Transport";
  contact: string;
  totalBusiness: number;
  outstanding: number;
  rating: number;
  status: "Active" | "Inactive";
}

export interface Invoice {
  id: string;
  customer: string;
  bookingId: string;
  amount: number;
  issueDate: string;
  dueDate: string;
  status: "Paid" | "Partially Paid" | "Pending" | "Overdue";
}

export interface Expense {
  id: string;
  supplier: string;
  category: string;
  amount: number;
  date: string;
  status: "Paid" | "Pending";
  reference: string;
}

export interface Payment {
  invoice: string;
  customer: string;
  bookingId: string;
  amount: number;
  method: string;
  status: "Paid" | "Pending" | "Overdue";
  date: string;
}

const INITIAL_PAYMENTS: Payment[] = [
  { invoice: "INV-2041", customer: "Rahul Sharma", bookingId: "BK-1024", amount: 50000, method: "UPI", status: "Paid", date: "Aug 19, 2026" },
  { invoice: "INV-2038", customer: "Priya Mehta", bookingId: "BK-1025", amount: 120000, method: "Bank Transfer", status: "Paid", date: "Jul 25, 2026" },
  { invoice: "INV-2045", customer: "Sneha Reddy", bookingId: "BK-1030", amount: 25000, method: "Pending", status: "Overdue", date: "Aug 15, 2026" },
];

export type ActiveDrawerType = 
  | null 
  | "lead" 
  | "customer" 
  | "booking" 
  | "package" 
  | "destination" 
  | "supplier" 
  | "payment" 
  | "invoice" 
  | "expense";

interface CRMContextType {
  // State lists
  leads: Lead[];
  customers: Customer[];
  bookings: Booking[];
  quotations: Quotation[];
  packages: Package[];
  destinations: Destination[];
  suppliers: Supplier[];
  invoices: Invoice[];
  expenses: Expense[];
  payments: Payment[];

  // Mutators
  addLead: (data: Omit<Lead, "id" | "created" | "lastActivity" | "potentialValue">) => Lead;
  updateLeadStage: (id: string, stage: string) => void;
  deleteLead: (id: string) => void;

  addCustomer: (data: Omit<Customer, "id" | "since" | "lifetimeValue" | "bookingsCount">) => Customer;
  deleteCustomer: (id: string) => void;

  addBooking: (data: Omit<Booking, "id" | "profit" | "created">) => Booking;
  deleteBooking: (id: string) => void;

  addQuotation: (data: Omit<Quotation, "id" | "date">) => Quotation;

  addPackage: (data: Omit<Package, "id" | "bookings" | "revenue">) => Package;
  deletePackage: (id: string) => void;

  addDestination: (data: Omit<Destination, "id" | "activePackages" | "totalLeads" | "bookings" | "revenue">) => Destination;
  deleteDestination: (id: string) => void;

  addSupplier: (data: Omit<Supplier, "id" | "totalBusiness">) => Supplier;
  deleteSupplier: (id: string) => void;

  addInvoice: (data: Omit<Invoice, "id" | "issueDate">) => Invoice;
  deleteInvoice: (id: string) => void;

  addExpense: (data: Omit<Expense, "id" | "date">) => Expense;
  deleteExpense: (id: string) => void;

  addPayment: (data: Payment) => void;

  // Reset all to mock data
  resetAllData: () => void;

  // Active drawer controller
  activeDrawer: ActiveDrawerType;
  openDrawer: (type: ActiveDrawerType) => void;
  closeDrawer: () => void;
}

const CRMContext = createContext<CRMContextType | undefined>(undefined);

const STORAGE_PREFIX = "tripflow_crm_";

export function CRMProvider({ children }: { children: React.ReactNode }) {
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS as Lead[]);
  const [customers, setCustomers] = useState<Customer[]>(INITIAL_CUSTOMERS as Customer[]);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS as Booking[]);
  const [quotations, setQuotations] = useState<Quotation[]>(INITIAL_QUOTATIONS as Quotation[]);
  const [packages, setPackages] = useState<Package[]>(INITIAL_PACKAGES as Package[]);
  const [destinations, setDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS as Destination[]);
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS as Supplier[]);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES as Invoice[]);
  const [expenses, setExpenses] = useState<Expense[]>(INITIAL_EXPENSES as Expense[]);
  const [payments, setPayments] = useState<Payment[]>(INITIAL_PAYMENTS);

  const [activeDrawer, setActiveDrawer] = useState<ActiveDrawerType>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const load = <T,>(key: string, defaultVal: T): T => {
        const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        if (!item) return defaultVal;
        const parsed = JSON.parse(item);
        return Array.isArray(parsed) && parsed.length > 0 ? (parsed as T) : defaultVal;
      };

      setLeads(load("leads", INITIAL_LEADS as Lead[]));
      setCustomers(load("customers", INITIAL_CUSTOMERS as Customer[]));
      setBookings(load("bookings", INITIAL_BOOKINGS as Booking[]));
      setQuotations(load("quotations", INITIAL_QUOTATIONS as Quotation[]));
      setPackages(load("packages", INITIAL_PACKAGES as Package[]));
      setDestinations(load("destinations", INITIAL_DESTINATIONS as Destination[]));
      setSuppliers(load("suppliers", INITIAL_SUPPLIERS as Supplier[]));
      setInvoices(load("invoices", INITIAL_INVOICES as Invoice[]));
      setExpenses(load("expenses", INITIAL_EXPENSES as Expense[]));
      setPayments(load("payments", INITIAL_PAYMENTS));
    } catch (e) {
      console.warn("Failed to load CRM data from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(`${STORAGE_PREFIX}leads`, JSON.stringify(leads));
      localStorage.setItem(`${STORAGE_PREFIX}customers`, JSON.stringify(customers));
      localStorage.setItem(`${STORAGE_PREFIX}bookings`, JSON.stringify(bookings));
      localStorage.setItem(`${STORAGE_PREFIX}quotations`, JSON.stringify(quotations));
      localStorage.setItem(`${STORAGE_PREFIX}packages`, JSON.stringify(packages));
      localStorage.setItem(`${STORAGE_PREFIX}destinations`, JSON.stringify(destinations));
      localStorage.setItem(`${STORAGE_PREFIX}suppliers`, JSON.stringify(suppliers));
      localStorage.setItem(`${STORAGE_PREFIX}invoices`, JSON.stringify(invoices));
      localStorage.setItem(`${STORAGE_PREFIX}expenses`, JSON.stringify(expenses));
      localStorage.setItem(`${STORAGE_PREFIX}payments`, JSON.stringify(payments));
    } catch (e) {}
  }, [
    leads,
    customers,
    bookings,
    quotations,
    packages,
    destinations,
    suppliers,
    invoices,
    expenses,
    payments,
    isHydrated,
  ]);

  // Mutators
  const addLead = (data: Omit<Lead, "id" | "created" | "lastActivity" | "potentialValue">) => {
    const newLead: Lead = {
      ...data,
      id: `LD-${Math.floor(2000 + Math.random() * 8000)}`,
      customerId: `CUS-${Math.floor(1000 + Math.random() * 9000)}`,
      potentialValue: data.budget,
      created: "Just now",
      lastActivity: "Just now",
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStage = (id: string, stage: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, stage, lastActivity: "Just now" } : l))
    );
  };

  const deleteLead = (id: string) => setLeads((prev) => prev.filter((l) => l.id !== id));

  const addCustomer = (data: Omit<Customer, "id" | "since" | "lifetimeValue" | "bookingsCount">) => {
    const newCustomer: Customer = {
      ...data,
      id: `CUS-${Math.floor(1000 + Math.random() * 9000)}`,
      since: "Aug 2026",
      lifetimeValue: 0,
      bookingsCount: 0,
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    return newCustomer;
  };

  const deleteCustomer = (id: string) => setCustomers((prev) => prev.filter((c) => c.id !== id));

  const addBooking = (data: Omit<Booking, "id" | "profit" | "created">) => {
    const newBooking: Booking = {
      ...data,
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      profit: Math.round(data.amount * 0.18),
      created: "Today",
    };
    setBookings((prev) => [newBooking, ...prev]);
    return newBooking;
  };

  const deleteBooking = (id: string) => setBookings((prev) => prev.filter((b) => b.id !== id));

  const addQuotation = (data: Omit<Quotation, "id" | "date">) => {
    const newQuotation: Quotation = {
      ...data,
      id: `QT-${Math.floor(1000 + Math.random() * 9000)}`,
      date: "Aug 21, 2026",
    };
    setQuotations((prev) => [newQuotation, ...prev]);
    return newQuotation;
  };

  const addPackage = (data: Omit<Package, "id" | "bookings" | "revenue">) => {
    const newPackage: Package = {
      ...data,
      id: `PKG-${Math.floor(100 + Math.random() * 900)}`,
      bookings: 0,
      revenue: 0,
    };
    setPackages((prev) => [newPackage, ...prev]);
    return newPackage;
  };

  const deletePackage = (id: string) => setPackages((prev) => prev.filter((p) => p.id !== id));

  const addDestination = (data: Omit<Destination, "id" | "activePackages" | "totalLeads" | "bookings" | "revenue">) => {
    const newDest: Destination = {
      ...data,
      id: `DST-${Math.floor(1 + Math.random() * 99)}`,
      activePackages: 1,
      totalLeads: 0,
      bookings: 0,
      revenue: 0,
    };
    setDestinations((prev) => [newDest, ...prev]);
    return newDest;
  };

  const deleteDestination = (id: string) => setDestinations((prev) => prev.filter((d) => d.id !== id));

  const addSupplier = (data: Omit<Supplier, "id" | "totalBusiness">) => {
    const newSup: Supplier = {
      ...data,
      id: `SUP-${Math.floor(100 + Math.random() * 900)}`,
      totalBusiness: 0,
    };
    setSuppliers((prev) => [newSup, ...prev]);
    return newSup;
  };

  const deleteSupplier = (id: string) => setSuppliers((prev) => prev.filter((s) => s.id !== id));

  const addInvoice = (data: Omit<Invoice, "id" | "issueDate">) => {
    const newInv: Invoice = {
      ...data,
      id: `INV-${Math.floor(3000 + Math.random() * 7000)}`,
      issueDate: "Aug 21, 2026",
    };
    setInvoices((prev) => [newInv, ...prev]);
    return newInv;
  };

  const deleteInvoice = (id: string) => setInvoices((prev) => prev.filter((i) => i.id !== id));

  const addExpense = (data: Omit<Expense, "id" | "date">) => {
    const newExp: Expense = {
      ...data,
      id: `EXP-${Math.floor(800 + Math.random() * 200)}`,
      date: "Aug 21, 2026",
    };
    setExpenses((prev) => [newExp, ...prev]);
    return newExp;
  };

  const deleteExpense = (id: string) => setExpenses((prev) => prev.filter((e) => e.id !== id));

  const addPayment = (data: Payment) => {
    setPayments((prev) => [data, ...prev]);
  };

  const resetAllData = () => {
    setLeads(INITIAL_LEADS as Lead[]);
    setCustomers(INITIAL_CUSTOMERS as Customer[]);
    setBookings(INITIAL_BOOKINGS as Booking[]);
    setQuotations(INITIAL_QUOTATIONS as Quotation[]);
    setPackages(INITIAL_PACKAGES as Package[]);
    setDestinations(INITIAL_DESTINATIONS as Destination[]);
    setSuppliers(INITIAL_SUPPLIERS as Supplier[]);
    setInvoices(INITIAL_INVOICES as Invoice[]);
    setExpenses(INITIAL_EXPENSES as Expense[]);
    setPayments(INITIAL_PAYMENTS);

    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith(STORAGE_PREFIX))
        .forEach((k) => localStorage.removeItem(k));
    } catch (e) {}
  };

  const openDrawer = (type: ActiveDrawerType) => setActiveDrawer(type);
  const closeDrawer = () => setActiveDrawer(null);

  return (
    <CRMContext.Provider
      value={{
        leads,
        customers,
        bookings,
        quotations,
        packages,
        destinations,
        suppliers,
        invoices,
        expenses,
        payments,
        addLead,
        updateLeadStage,
        deleteLead,
        addCustomer,
        deleteCustomer,
        addBooking,
        deleteBooking,
        addQuotation,
        addPackage,
        deletePackage,
        addDestination,
        deleteDestination,
        addSupplier,
        deleteSupplier,
        addInvoice,
        deleteInvoice,
        addExpense,
        deleteExpense,
        addPayment,
        resetAllData,
        activeDrawer,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
    </CRMContext.Provider>
  );
}

export function useCRM() {
  const context = useContext(CRMContext);
  if (!context) {
    throw new Error("useCRM must be used within a CRMProvider");
  }
  return context;
}
