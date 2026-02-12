
import React, { useState, useEffect } from 'react';
import { Complaint, Task, Expense, Recommendation, UserRole, User, CustomerRecord, VisitLog } from '../types';

interface AdminDashboardProps {
  tasks: Task[];
  addTask: (task: Task) => void;
  expenses: Expense[];
  updateExpenseStatus: (id: string, status: Expense['status']) => void;
  recommendations: Recommendation[];
  complaints: Complaint[];
  customers: CustomerRecord[];
  addCustomer: (c: CustomerRecord) => void;
  users: User[];
  addUser: (u: User) => void;
  visitLogs: VisitLog[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  tasks, addTask, expenses, updateExpenseStatus, recommendations, complaints, customers, addCustomer, users, addUser, visitLogs 
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'tasks' | 'users' | 'customers' | 'expenses'>('overview');
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setPulse(true);
    const timer = setTimeout(() => setPulse(false), 2000);
    return () => clearTimeout(timer);
  }, [tasks, expenses, visitLogs]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Management Suite</h1>
          <p className="text-slate-500 font-black uppercase text-[10px] tracking-[0.4em] mt-3">Real-time Enterprise Oversight • HiTech Machinery</p>
        </div>
        <div className={`flex items-center gap-4 px-8 py-4 rounded-[1.5rem] border border-blue-100 bg-white shadow-2xl transition-all ${pulse ? 'ring-8 ring-blue-100' : ''}`}>
           <div className={`w-3.5 h-3.5 rounded-full ${pulse ? 'bg-orange-500 animate-ping' : 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]'}`} />
           <span className="text-[11px] font-black uppercase text-blue-900 tracking-[0.2em] italic">Encrypted Secure Node</span>
        </div>
      </header>

      <nav className="flex bg-white p-2.5 rounded-[2.2rem] shadow-sm border border-slate-100 overflow-x-auto no-scrollbar gap-2.5">
        {(['overview', 'reports', 'tasks', 'users', 'customers', 'expenses'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-12 py-4.5 rounded-[1.5rem] text-[11px] font-black uppercase tracking-[0.25em] transition-all whitespace-nowrap ${activeTab === tab ? 'bg-[#0f172a] text-white shadow-2xl' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}`}
          >
            {tab}
          </button>
        ))}
      </nav>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <StatCard label="Live Operations" value={visitLogs.length} color="bg-blue-600" />
          <StatCard label="Pipeline Equity" value={`$${recommendations.reduce((a, b) => a + b.estimatedProfit, 0).toLocaleString()}`} color="bg-emerald-600" />
          <StatCard label="Mission Backlog" value={tasks.filter(t => t.status !== 'Completed').length} color="bg-orange-500" />
          <StatCard label="Staff Allocation" value={users.length} color="bg-[#0f172a]" />
        </div>
      )}

      {activeTab === 'reports' && (
        <div className="space-y-12">
          <section className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
            <h2 className="text-2xl font-black mb-12 italic uppercase tracking-tight flex items-center gap-4">
              <div className="w-2 h-10 bg-blue-600 rounded-full" />
              Intelligence Feed
            </h2>
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left">
                <thead className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400 border-b border-slate-50">
                  <tr>
                    <th className="px-10 py-8">Staff Member</th>
                    <th className="px-10 py-8">Client Identity</th>
                    <th className="px-10 py-8">Event Profile</th>
                    <th className="px-10 py-8">Verification</th>
                    <th className="px-10 py-8 text-right">Coordinates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {visitLogs.map(log => (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-10 py-8">
                        <p className="font-black text-slate-900 text-base">{log.userName}</p>
                      </td>
                      <td className="px-10 py-8">
                        <p className="font-black text-blue-600 text-base group-hover:underline cursor-pointer">{log.clientName}</p>
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1.5 inline-block border border-slate-100 px-2 rounded-full">{log.clientType} SECTOR</span>
                      </td>
                      <td className="px-10 py-8">
                        <p className="font-bold text-xs uppercase tracking-widest text-slate-700">{log.visitType}</p>
                        <p className="text-[10px] text-slate-400 mt-1 font-semibold">{log.checkIn} - {log.checkOut || 'Active Engagement'}</p>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex gap-3">
                           {log.checkInPhoto && <div className="w-12 h-12 rounded-2xl bg-slate-200 overflow-hidden border-2 border-slate-300 shadow-sm hover:scale-125 transition-transform z-10 cursor-zoom-in"><img src={log.checkInPhoto} className="w-full h-full object-cover" alt="Checkin" /></div>}
                           {log.checkOutPhoto && <div className="w-12 h-12 rounded-2xl bg-slate-200 overflow-hidden border-2 border-slate-300 shadow-sm hover:scale-125 transition-transform z-10 cursor-zoom-in"><img src={log.checkOutPhoto} className="w-full h-full object-cover" alt="Checkout" /></div>}
                        </div>
                      </td>
                      <td className="px-10 py-8 text-right text-[11px] font-black text-slate-400 tracking-tighter">
                        {log.location.lat.toFixed(5)} N, {log.location.lng.toFixed(5)} W
                      </td>
                    </tr>
                  ))}
                  {visitLogs.length === 0 && <tr><td colSpan={5} className="py-24 text-center text-slate-300 font-black italic text-lg opacity-40">No intelligence data retrieved for the current fiscal period.</td></tr>}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {activeTab === 'expenses' && (
        <div className="bg-white rounded-[3.5rem] border border-slate-100 shadow-sm overflow-hidden">
           <div className="p-12 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-2xl font-black italic uppercase tracking-tight">Financial Audit Node</h3>
              <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] bg-orange-50 px-4 py-2 rounded-full border border-orange-100 shadow-sm">{expenses.filter(e => e.status === 'Pending').length} ACTIONS REQUIRED</span>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-[10px] font-black uppercase tracking-[0.25em] text-slate-500">
                   <tr>
                     <th className="px-12 py-8">Personnel</th>
                     <th className="px-12 py-8">Audit Narrative</th>
                     <th className="px-12 py-8">Evidence</th>
                     <th className="px-12 py-8">Valuation</th>
                     <th className="px-12 py-8 text-right">Verification Audit</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {expenses.map(e => (
                    <tr key={e.id} className="hover:bg-slate-50/50 transition-all group">
                      <td className="px-12 py-10 font-black text-slate-900 text-base">{e.userName}</td>
                      <td className="px-12 py-10">
                        <p className="text-slate-700 font-bold text-sm leading-relaxed">{e.description}</p>
                        <p className="text-[10px] font-black text-blue-600 uppercase mt-2 tracking-widest">{e.category} SECTOR • {e.date}</p>
                      </td>
                      <td className="px-12 py-10">
                        {e.receiptUrl ? (
                          <div className="w-16 h-16 bg-slate-200 rounded-2xl overflow-hidden border-2 border-slate-300 shadow-xl group-hover:rotate-3 transition-transform cursor-pointer">
                            <img src={e.receiptUrl} className="w-full h-full object-cover" alt="Audit Bill" />
                          </div>
                        ) : (
                          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Digital Entry Only</span>
                        )}
                      </td>
                      <td className="px-12 py-10 font-black text-3xl tracking-tighter text-slate-900">${e.amount.toLocaleString()}</td>
                      <td className="px-12 py-10 text-right">
                         {e.status === 'Pending' ? (
                           <div className="flex justify-end gap-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                              <button onClick={() => updateExpenseStatus(e.id, 'Approved')} className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black hover:bg-emerald-700 shadow-xl shadow-emerald-900/10 transition-all uppercase tracking-widest">VERIFY</button>
                              <button onClick={() => updateExpenseStatus(e.id, 'Rejected')} className="px-6 py-3 bg-red-600 text-white rounded-2xl text-[10px] font-black hover:bg-red-700 shadow-xl shadow-red-900/10 transition-all uppercase tracking-widest">DENY</button>
                           </div>
                         ) : (
                           <span className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${e.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                             {e.status}
                           </span>
                         )}
                      </td>
                    </tr>
                  ))}
                  {expenses.length === 0 && <tr><td colSpan={5} className="py-24 text-center text-slate-300 font-black italic text-lg opacity-40">Financial audit queue cleared for HiTech Machinery.</td></tr>}
                </tbody>
              </table>
           </div>
        </div>
      )}
      
      {activeTab === 'users' && <div className="p-20 bg-white rounded-[3.5rem] text-center border border-slate-100 text-slate-300 font-black uppercase tracking-[0.5em] opacity-40 text-lg">Identity management flow optimized for administrative oversight.</div>}
    </div>
  );
};

const StatCard = ({ label, value, color }: { label: string, value: string | number, color: string }) => (
  <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm group hover:border-blue-600 transition-all hover:shadow-[0_20px_60px_-15px_rgba(30,58,138,0.1)] relative overflow-hidden">
     <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full translate-x-16 -translate-y-16 group-hover:bg-blue-50 transition-colors" />
     <div className={`w-20 h-20 rounded-[2.5rem] ${color} mb-10 flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all relative z-10`}>
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
     </div>
     <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.25em] mb-4 relative z-10">{label}</p>
     <p className="text-5xl font-black text-slate-900 tracking-tighter relative z-10">{value}</p>
  </div>
);

export default AdminDashboard;
