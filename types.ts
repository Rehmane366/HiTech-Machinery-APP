
export enum UserRole {
  ADMIN = 'ADMIN',
  CUSTOMER = 'CUSTOMER',
  SALES = 'SALES',
  TECHNICAL = 'TECHNICAL'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  username: string;
  password?: string;
}

export interface CustomerRecord {
  id: string;
  name: string;
  industry: string;
  contactPerson: string;
  email: string;
  addedAt: string;
}

export interface Complaint {
  id: string;
  customerId: string;
  customerName: string;
  subject: string;
  description: string;
  status: 'Open' | 'Pending' | 'Resolved';
  date: string;
  aiSummary?: string;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  expiry: string;
}

export interface Task {
  id: string;
  assignedToId: string;
  staffName: string;
  clientName: string;
  clientType: 'New' | 'Existing';
  taskType: 'Sales Visit' | 'Technical Service' | 'Walking Tour' | 'Other';
  description: string;
  status: 'Assigned' | 'In Progress' | 'Completed';
  createdAt: string;
  completedAt?: string;
}

export interface Expense {
  id: string;
  userId: string;
  userName: string;
  amount: number;
  category: 'Food' | 'Fuel' | 'Rent' | 'Tools' | 'Other';
  description: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
  receiptUrl?: string;
}

export interface Recommendation {
  id: string;
  techId: string;
  techName: string;
  customerId: string;
  customerName: string;
  productName: string;
  estimatedProfit: number;
  date: string;
}

export interface VisitLog {
  id: string;
  userId: string;
  userName: string;
  clientName: string;
  clientType: 'New' | 'Existing';
  visitType: 'Regular' | 'Walking Tour';
  checkIn: string;
  checkOut?: string;
  checkInPhoto?: string;
  checkOutPhoto?: string;
  durationMinutes?: number;
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
}
