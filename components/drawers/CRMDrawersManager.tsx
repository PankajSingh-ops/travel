"use client";

import React from "react";
import { NewLeadDrawer } from "@/components/leads/NewLeadDrawer";
import { NewCustomerDrawer } from "@/components/drawers/NewCustomerDrawer";
import NewBookingDrawer from "./NewBookingDrawer";
import NewPackageDrawer from "./NewPackageDrawer";
import NewDestinationDrawer from "./NewDestinationDrawer";
import NewSupplierDrawer from "./NewSupplierDrawer";
import NewPaymentDrawer from "./NewPaymentDrawer";
import NewInvoiceDrawer from "./NewInvoiceDrawer";
import NewExpenseDrawer from "./NewExpenseDrawer";


export function CRMDrawersManager() {
  return (
    <>
      <NewLeadDrawer />
      <NewCustomerDrawer />
      <NewBookingDrawer />
      <NewPackageDrawer />
      <NewDestinationDrawer />
      <NewSupplierDrawer />
      <NewPaymentDrawer />
      <NewInvoiceDrawer />
      <NewExpenseDrawer />
    </>
  );
}
