"use client";

import React, { useState } from "react";
import { 
  Plus, 
  MessageCircle, 
  MoreHorizontal, 
  Search,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { LEADS, PIPELINE_STAGES } from "@/lib/mock-data";
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableLeadCard({ lead }: { lead: any }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: lead.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners} 
      className="mb-3 cursor-grab rounded-lg border bg-card p-3 sm:p-4 shadow-xs active:cursor-grabbing hover:border-primary/50 transition-colors"
    >
      <div className="mb-2 flex items-start justify-between">
        <h4 className="font-semibold text-sm">{lead.customerName}</h4>
        <Button variant="ghost" size="icon" className="h-6 w-6 -mr-1 -mt-1 text-muted-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </div>
      <div className="mb-3 space-y-1 text-xs text-muted-foreground">
        <p className="flex items-center text-foreground font-medium">
          {lead.destination} &middot; {lead.travelers}
        </p>
        <p>Budget: ₹{(lead.budget).toLocaleString('en-IN')}</p>
        <p>Source: {lead.source}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs">
          <Badge variant="outline" className="text-[10px] bg-muted">{lead.assignedTo}</Badge>
          {lead.score === "HOT" && <Badge variant="destructive" className="text-[10px]">HOT</Badge>}
        </div>
        <MessageCircle className="h-4 w-4 text-success" />
      </div>
    </div>
  );
}

export default function PipelinePage() {
  const [leads, setLeads] = useState(LEADS);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col p-4 sm:p-6 md:p-8 pt-4 sm:pt-6">
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-primary">Sales Pipeline</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">Drag and drop leads to update their stages.</p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="relative w-48 sm:w-64 hidden sm:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search pipeline..." className="pl-8 bg-card h-9 text-xs sm:text-sm" />
          </div>
          <Button variant="outline" size="sm" className="h-9">
            <Filter className="mr-1.5 h-3.5 w-3.5" />
            Filters
          </Button>
          <Button size="sm" className="h-9 shadow-xs">
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            New Deal
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden scrollbar-hide">
        <div className="flex h-full gap-3 sm:gap-4 pb-4 px-1" style={{ width: "max-content" }}>
          {PIPELINE_STAGES.map((stage) => {
            const stageLeads = leads.filter(l => l.stage === stage);
            const totalValue = stageLeads.reduce((sum, l) => sum + l.budget, 0);

            return (
              <div key={stage} className="flex h-full w-[280px] sm:w-[320px] flex-col rounded-xl bg-muted/40 p-3">
                <div className="mb-2 sm:mb-3 flex items-center justify-between px-1">
                  <h3 className="font-semibold text-xs sm:text-sm">{stage}</h3>
                  <Badge variant="secondary" className="bg-muted text-muted-foreground text-xs">
                    {stageLeads.length}
                  </Badge>
                </div>
                <div className="mb-3 px-1 text-xs text-muted-foreground font-medium">
                  ₹{(totalValue).toLocaleString('en-IN')}
                </div>
                
                <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-hide pb-2">
                  <DndContext sensors={sensors}>
                    <SortableContext items={stageLeads.map(l => l.id)} strategy={verticalListSortingStrategy}>
                      {stageLeads.map((lead) => (
                        <SortableLeadCard key={lead.id} lead={lead} />
                      ))}
                    </SortableContext>
                  </DndContext>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
