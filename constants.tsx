
import React from 'react';
import { Complaint, Promotion, Task, Expense, UserRole, User, Recommendation, VisitLog, CustomerRecord } from './types';

export const INITIAL_USERS: User[] = [
  { id: 'U1', name: 'Board Administrator', role: UserRole.ADMIN, email: 'admin@hitech.com', username: 'admin', password: '123456@78' },
  { id: 'U2', name: 'Strategic Partner', role: UserRole.CUSTOMER, email: 'customer@client.com', username: 'customer', password: '123456@78' },
  { id: 'U3', name: 'Global Sales Executive', role: UserRole.SALES, email: 'sales@hitech.com', username: 'saleperson', password: '123456@78' },
  { id: 'U4', name: 'Lead Field Engineer', role: UserRole.TECHNICAL, email: 'tech@hitech.com', username: 'techperson', password: '123456@78' },
];

export const INITIAL_CUSTOMERS: CustomerRecord[] = [
  { id: 'C1', name: 'Apex Industries', industry: 'Manufacturing', contactPerson: 'Sarah Chen', email: 'ops@apex.com', addedAt: '2024-01-10' },
  { id: 'C2', name: 'BuildCorp Global', industry: 'Construction', contactPerson: 'James Wilson', email: 'j.wilson@buildcorp.com', addedAt: '2024-02-15' },
];

export const MOCK_PROMOTIONS: Promotion[] = [
  {
    id: 'P1',
    title: 'Hydraulic System Overhaul',
    description: 'Exclusive 20% efficiency rebate for strategic partners.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800',
    expiry: '2024-12-31'
  }
];

export const Logo = ({ className = "w-24 h-24" }) => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="hexClip">
          <path d="M256 10L42.5 133.5V378.5L256 502L469.5 378.5V133.5L256 10Z" />
        </clipPath>
      </defs>
      {/* Background Hexagon */}
      <path d="M256 10L42.5 133.5V378.5L256 502L469.5 378.5V133.5L256 10Z" fill="#1e4e8c" />
      
      {/* Internal Gear Detail (Right Side) */}
      <g clipPath="url(#hexClip)">
        <path d="M430 180 C480 230 480 300 430 350 L430 320 C460 280 460 250 430 210 Z" fill="#f26522" opacity="0.8" />
        <path d="M310 145C380 145 440 200 440 280C440 360 380 415 310 415" stroke="#f26522" strokeWidth="45" strokeDasharray="50 25" strokeLinecap="butt" />
      </g>
      
      {/* Inner Border */}
      <path d="M256 35L68 143.5V368.5L256 477L444 368.5V143.5L256 35Z" stroke="white" strokeWidth="12" fill="none" />
      
      {/* Main Text */}
      <text x="85" y="275" fill="white" fontSize="105" fontWeight="900" fontFamily="'Inter', 'Arial Black', sans-serif">Hi</text>
      <text x="185" y="275" fill="white" fontSize="90" fontWeight="900" fontFamily="'Inter', 'Arial Black', sans-serif">TECH</text>
      <text x="85" y="335" fill="white" fontSize="30" fontWeight="800" fontFamily="'Inter', sans-serif" letterSpacing="14">MACHINERY</text>
    </svg>
  </div>
);

export const ICONS = {
  Dashboard: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
  LogOut: () => <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
};
