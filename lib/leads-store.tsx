"use client";

import React from "react";
import { useCRM, Lead } from "./crm-store";

export type { Lead };

export function LeadsProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useLeads() {
  const {
    leads,
    addLead,
    updateLeadStage,
    deleteLead,
    resetAllData,
    activeDrawer,
    openDrawer,
    closeDrawer,
  } = useCRM();

  return {
    leads,
    addLead,
    updateLeadStage,
    deleteLead,
    resetLeads: resetAllData,
    isNewLeadModalOpen: activeDrawer === "lead",
    openNewLeadModal: () => openDrawer("lead"),
    closeNewLeadModal: closeDrawer,
  };
}
