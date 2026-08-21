export const CUSTOMERS = [
  {
    id: "CUS-1001",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
    since: "Aug 2026",
    lifetimeValue: 480000,
    bookingsCount: 5,
    tags: ["VIP", "Family Traveler"],
    assignedTo: "Amit",
  },
  {
    id: "CUS-1002",
    name: "Priya Mehta",
    phone: "+91 87654 32109",
    email: "priya.mehta@example.com",
    since: "Jul 2026",
    lifetimeValue: 120000,
    bookingsCount: 1,
    tags: ["Solo Traveler", "Budget"],
    assignedTo: "Neha",
  },
];

export const LEADS = [
  {
    id: "LD-2045",
    customerName: "Rahul Sharma",
    customerId: "CUS-1001",
    phone: "+91 98765 43210",
    destination: "Dubai",
    travelDates: "Sep 12 - Sep 18, 2026",
    travelers: "2 Adults",
    budget: 150000,
    source: "WhatsApp",
    stage: "Negotiation",
    assignedTo: "Amit",
    potentialValue: 150000,
    lastActivity: "2 hours ago",
    created: "Aug 15, 2026",
    score: "HOT",
  },
  {
    id: "LD-2046",
    customerName: "Vikas Patel",
    customerId: "CUS-1003",
    phone: "+91 76543 21098",
    destination: "Bali",
    travelDates: "Oct 05 - Oct 10, 2026",
    travelers: "2 Adults",
    budget: 90000,
    source: "Instagram",
    stage: "New",
    assignedTo: "Unassigned",
    potentialValue: 90000,
    lastActivity: "1 day ago",
    created: "Aug 20, 2026",
    score: "WARM",
  },
  {
    id: "LD-2047",
    customerName: "Sneha Reddy",
    customerId: "CUS-1004",
    phone: "+91 65432 10987",
    destination: "Maldives",
    travelDates: "Nov 01 - Nov 05, 2026",
    travelers: "2 Adults",
    budget: 250000,
    source: "Website",
    stage: "Quotation Sent",
    assignedTo: "Neha",
    potentialValue: 250000,
    lastActivity: "4 hours ago",
    created: "Aug 18, 2026",
    score: "HOT",
  },
];

export const BOOKINGS = [
  {
    id: "BK-1024",
    customerName: "Rahul Sharma",
    destination: "Dubai",
    travelDates: "Sep 12 - Sep 18, 2026",
    travelers: "2 Adults",
    amount: 150000,
    paid: 50000,
    pending: 100000,
    profit: 30000,
    status: "Partially Paid",
    assignedTo: "Amit",
    created: "Aug 19, 2026",
  },
  {
    id: "BK-1025",
    customerName: "Priya Mehta",
    destination: "Kashmir",
    travelDates: "Dec 10 - Dec 15, 2026",
    travelers: "2 Adults",
    amount: 120000,
    paid: 120000,
    pending: 0,
    profit: 25000,
    status: "Confirmed",
    assignedTo: "Neha",
    created: "Jul 25, 2026",
  }
];

export const QUOTATIONS = [
  {
    id: "QT-1042",
    customerName: "Rahul Sharma",
    destination: "Dubai Premium Escape",
    amount: 150000,
    date: "Aug 16, 2026",
    status: "Sent",
  },
  {
    id: "QT-1043",
    customerName: "Sneha Reddy",
    destination: "Maldives Honeymoon",
    amount: 250000,
    date: "Aug 18, 2026",
    status: "Sent",
  }
];

export const WHATSAPP_MESSAGES = [
  {
    id: "MSG-1",
    customerName: "Rahul Sharma",
    phone: "+91 98765 43210",
    lastMessage: "Can you reduce the package price?",
    time: "2m",
    unreadCount: 1,
    leadStatus: "HOT",
    assignedTo: "Amit",
    destination: "Dubai",
    potentialValue: 150000,
    messages: [
      { sender: "System", type: "info", text: "Customer sent a message", time: "Aug 15" },
      { sender: "Rahul Sharma", type: "user", text: "Hi, I am looking for a Dubai package in September.", time: "10:00 AM" },
      { sender: "Amit", type: "agent", text: "Hello Rahul, surely. For how many people?", time: "10:05 AM" },
      { sender: "Rahul Sharma", type: "user", text: "2 adults.", time: "10:07 AM" },
      { sender: "Amit", type: "agent", text: "I will share a quotation with you shortly.", time: "10:15 AM" },
      { sender: "System", type: "info", text: "Quotation QT-1042 sent", time: "Aug 16" },
      { sender: "Rahul Sharma", type: "user", text: "Can you reduce the package price?", time: "2m ago" },
    ]
  },
  {
    id: "MSG-2",
    customerName: "Vikas Patel",
    phone: "+91 76543 21098",
    lastMessage: "Please share the itinerary details.",
    time: "1h",
    unreadCount: 2,
    leadStatus: "WARM",
    assignedTo: "Unassigned",
    destination: "Bali",
    potentialValue: 90000,
    messages: [
      { sender: "Vikas Patel", type: "user", text: "I saw your instagram ad for Bali.", time: "1h ago" },
      { sender: "Vikas Patel", type: "user", text: "Please share the itinerary details.", time: "1h ago" },
    ]
  }
];

export const PIPELINE_STAGES = [
  "New",
  "Contacted",
  "Requirement",
  "Quotation",
  "Negotiation",
  "Advance Paid",
  "Booked",
  "Lost",
];

export const PACKAGES = [
  {
    id: "PKG-101",
    name: "Dubai Premium Escape",
    duration: "6 Nights / 7 Days",
    startingPrice: 74999,
    bookings: 32,
    revenue: 2480000,
    status: "Active",
  },
  {
    id: "PKG-102",
    name: "Bali Romantic Getaway",
    duration: "5 Nights / 6 Days",
    startingPrice: 65000,
    bookings: 18,
    revenue: 1170000,
    status: "Active",
  },
  {
    id: "PKG-103",
    name: "Kashmir Winter Special",
    duration: "4 Nights / 5 Days",
    startingPrice: 42000,
    bookings: 45,
    revenue: 1890000,
    status: "Active",
  }
];

export const DESTINATIONS = [
  {
    id: "DST-1",
    name: "Dubai",
    activePackages: 4,
    totalLeads: 124,
    bookings: 85,
    revenue: 8500000,
    status: "Active",
  },
  {
    id: "DST-2",
    name: "Bali",
    activePackages: 3,
    totalLeads: 85,
    bookings: 42,
    revenue: 3500000,
    status: "Active",
  },
  {
    id: "DST-3",
    name: "Maldives",
    activePackages: 2,
    totalLeads: 65,
    bookings: 25,
    revenue: 4500000,
    status: "Active",
  }
];

export const SUPPLIERS = [
  {
    id: "SUP-101",
    name: "Emirates",
    category: "Airline",
    contact: "B2B Desk",
    totalBusiness: 4500000,
    outstanding: 0,
    rating: 4.8,
    status: "Active",
  },
  {
    id: "SUP-102",
    name: "JW Marriott Marquis",
    category: "Hotel",
    contact: "sales.dxb@marriott.com",
    totalBusiness: 2800000,
    outstanding: 250000,
    rating: 4.5,
    status: "Active",
  },
  {
    id: "SUP-103",
    name: "Desert Safari Tours LLC",
    category: "Activity",
    contact: "bookings@desertsafari.ae",
    totalBusiness: 850000,
    outstanding: 45000,
    rating: 4.9,
    status: "Active",
  }
];

export const INVOICES = [
  {
    id: "INV-3051",
    customer: "Rahul Sharma",
    bookingId: "BK-1024",
    amount: 150000,
    issueDate: "Aug 19, 2026",
    dueDate: "Sep 01, 2026",
    status: "Partially Paid",
  },
  {
    id: "INV-3052",
    customer: "Priya Mehta",
    bookingId: "BK-1025",
    amount: 120000,
    issueDate: "Jul 25, 2026",
    dueDate: "Aug 05, 2026",
    status: "Paid",
  },
  {
    id: "INV-3053",
    customer: "Amit Verma",
    bookingId: "BK-1026",
    amount: 75000,
    issueDate: "Aug 20, 2026",
    dueDate: "Sep 05, 2026",
    status: "Pending",
  }
];

export const EXPENSES = [
  {
    id: "EXP-801",
    supplier: "Emirates",
    category: "Flights",
    amount: 45000,
    date: "Aug 15, 2026",
    status: "Paid",
    reference: "BK-1024",
  },
  {
    id: "EXP-802",
    supplier: "JW Marriott Marquis",
    category: "Hotel",
    amount: 32000,
    date: "Aug 18, 2026",
    status: "Pending",
    reference: "BK-1024",
  },
  {
    id: "EXP-803",
    supplier: "Meta Ads",
    category: "Marketing",
    amount: 15000,
    date: "Aug 20, 2026",
    status: "Paid",
    reference: "Monthly Ad Spend",
  }
];
