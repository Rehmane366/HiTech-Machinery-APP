
import React, { useState } from 'react';
import { VisitLog, Expense, Task, User, CustomerRecord, Recommendation } from '../types';

interface SalesModuleProps {
  user: User;
  tasks: Task[];
  updateTaskStatus: (id: string, status: Task['status']) => void;
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  customers: CustomerRecord[];
  visitLogs: VisitLog[];
  addVisitLog: (log: VisitLog) => void;
  updateVisitLog: (id: string, data: Partial<VisitLog>) => void;
  recommendations: Recommendation[];
}

const SalesModule: React.FC<SalesModuleProps> = ({ 
  user, tasks, updateTaskStatus, expenses, addExpense, customers, visitLogs, addVisitLog, updateVisitLog, recommendations 
}) => {
  const [activeTab, setActiveTab] = useState<'missions' | 'expenses' | 'performance'>('missions');
  const [isCheckInMode, setIsCheckInMode] = useState(false);
  const [currentVisitId, setCurrentVisitId] = useState<string | null>(null);
  const [clientType, setClientType] = useState<'Existing' | 'New'>('Existing');
  const [clientName, setClientName] = useState('');
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const handleCheckIn = () => {
    if (!clientName) return alert("Identify client entity before deployment.");
    
    const newVisit: VisitLog = {
      id: `V${Date.now()}`,
      userId: user.id,
      userName: user.name,
      clientName: clientName,
      clientType: clientType,
      visitType: 'Regular',
      checkIn: new Date().toLocaleTimeString(),
      checkInPhoto: `https://picsum.photos/400/400?random=${Math.random()}`,
      location: { lat: 34.0522 + (Math.random() - 0.5) / 10, lng: -118.2437 + (Math.random() - 0.5) / 10 }
    };
    
    addVisitLog(newVisit);
    setCurrentVisitId(newVisit.id);
    setIsCheckInMode(true);
    alert("Biometric verification successful. GPS Tracking active.");
  };

  const handleCheckOut = () => {
    if (!currentVisitId) return;
    updateVisitLog(currentVisitId, {
      checkOut: new Date().toLocaleTimeString(),
      checkOutPhoto: `https://picsum.photos/400/400?random=${Math.random()}`,
      durationMinutes: Math.floor(Math.random() * 120) + 15
    });
    setIsCheckInMode(false);
    setCurrentVisitId(null);
    setClientName('');
    alert("Mission report synchronized. Visit data archived.");
  };

  const submitExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newExp: Expense = {
      id: `E${Date.now()}`,
      userId: user.id,
      userName: user.name,
      amount: Number(fd.get('amount')),
      category: fd.get('category') as any,
      description: fd.get('description') as string,
      status: 'Pending',
      date: new Date().toLocaleDateString(),
      receiptUrl: `https://picsum.photos/400/600?random=${Math.random()}`
    };
    addExpense(newExp);
    setShowExpenseForm(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic uppercase">Sales Executive Hub</h1>
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.3em] mt-1">Global Market Deployment</p>
        </div>
      </header>

      <div className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100 max-w-md">
        {(['missions', 'expenses', 'performance'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-400 hover:text-slate-600'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'missions' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           {/* Verification Console */}
           <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <h3 className="text-xl font-black mb-8 italic uppercase tracking-tight">Visit Verification</h3>
              {!isCheckInMode ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Client Identity</label>
                    <div className="flex gap-4">
                      <button onClick={() => setClientType('Existing')} className={`flex-1 py-3 rounded-xl text-[10px] font-black border transition-all ${clientType === 'Existing' ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>EXISTING</button>
                      <button onClick={() => setClientType('New')} className={`flex-1 py-3 rounded-xl text-[10px] font-black border transition-all ${clientType === 'New' ? 'bg-orange-600 text-white border-orange-600' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>NEW MARKET</button>
                    </div>
                  </div>
                  {clientType === 'Existing' ? (
                    <select value={clientName} onChange={e => setClientName(e.target.value)} className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold">
                      <option value="">Choose Partner...</option>
                      {customers.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                    </select>
                  ) : (
                    <input value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Company Entity Name" className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-2xl outline-none font-bold" />
                  )}
                  <div className="p-10 border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center text-slate-300">
                    <svg className="w-12 h-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <p className="text-[10px] font-black uppercase tracking-widest">Camera Verification Required</p>
                  </div>
                  <button onClick={handleCheckIn} className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl shadow-2xl hover:bg-blue-700 transition-all">INITIALIZE CHECK-IN</button>
                </div>
              ) : (
                <div className="text-center space-y-8 py-6">
                  <div className="relative inline-block">
                    <div className="w-40 h-40 bg-blue-50 rounded-full flex items-center justify-center border-8 border-blue-100 animate-pulse">
                      <svg className="w-20 h-20 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">{clientName}</h4>
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mt-2">Mission Duration Tracked</p>
                  </div>
                  <button onClick={handleCheckOut} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-2xl">VERIFY CHECK-OUT</button>
                </div>
              )}
           </div>

           {/* Mission Feed */}
           <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                <h3 className="font-black text-xs uppercase tracking-widest text-slate-400 italic">Directive Queue</h3>
              </div>
              <div className="flex-1 overflow-y-auto max-h-[400px] p-4 space-y-4">
                {tasks.map(t => (
                  <div key={t.id} className="p-6 bg-slate-50 rounded-[2rem] flex justify-between items-center">
                     <div>
                       <p className="font-black text-slate-900">{t.clientName}</p>
                       <p className="text-xs text-slate-500 italic">{t.description}</p>
                     </div>
                     <button onClick={() => updateTaskStatus(t.id, 'Completed')} className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${t.status === 'Completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-600 text-white shadow-lg'}`}>
                       {t.status === 'Completed' ? 'DONE' : 'START'}
                     </button>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-10 animate-in fade-in duration-700">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatCardSmall label="Total Field Visits" value={visitLogs.length} color="text-blue-600" />
              <StatCardSmall label="Market Penetration" value={visitLogs.filter(v => v.clientType === 'New').length} color="text-orange-600" />
              <StatCardSmall label="Revenue Secured" value={`$${recommendations.reduce((a, b) => a + b.estimatedProfit, 0).toLocaleString()}`} color="text-emerald-600" />
           </div>

           <div className="bg-white p-10 rounded-[3rem] border border-slate-100">
              <h3 className="text-2xl font-black mb-8 italic uppercase tracking-tight">Monthly Activity Report</h3>
              <div className="space-y-6">
                {visitLogs.map(log => (
                  <div key={log.id} className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm">
                        <img src={log.checkInPhoto} className="w-full h-full object-cover" alt="Check" />
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-lg tracking-tight">{log.clientName}</p>
                        <p className="text-[10px] font-black uppercase text-blue-500 tracking-widest">{log.clientType} CLIENT • {log.durationMinutes || 0} MINS</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="font-black text-slate-400 text-[10px] uppercase tracking-widest">{log.checkIn.split(' ')[0]}</p>
                       <p className="text-[9px] text-slate-300 font-bold">LAT: {log.location.lat.toFixed(2)} / LNG: {log.location.lng.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>
        </div>
      )}

      {/* Expense flow same as technical personnel, provided via addExpense */}
      {activeTab === 'expenses' && (
         <div className="bg-white p-10 rounded-[3rem] border border-slate-100">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-black italic uppercase tracking-tight">Digital Receipts</h3>
              <button onClick={() => setShowExpenseForm(!showExpenseForm)} className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">SUBMIT NEW BILL</button>
           </div>
           {showExpenseForm && (
             <form onSubmit={submitExpense} className="mb-10 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-200 animate-in slide-in-from-top">
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <input name="amount" type="number" step="0.01" required placeholder="Valuation ($)" className="px-6 py-4 rounded-2xl border border-slate-200 outline-none font-bold" />
                  <select name="category" className="px-6 py-4 rounded-2xl border border-slate-200 outline-none font-bold">
                    <option value="Fuel">Fuel / Logistics</option>
                    <option value="Food">Personnel Meals</option>
                    <option value="Rent">Corporate Lodging</option>
                  </select>
                </div>
                <input name="description" required placeholder="Brief narrative of expenditure" className="w-full px-6 py-4 rounded-2xl border border-slate-200 outline-none font-bold mb-6" />
                <div className="p-10 border-4 border-dashed border-slate-200 rounded-3xl text-center mb-6">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Attach Digital Bill Copy</p>
                </div>
                <button type="submit" className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl">FINALIZE CLAIM</button>
             </form>
           )}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {expenses.map(e => (
               <div key={e.id} className="p-6 bg-white border border-slate-100 rounded-3xl flex justify-between items-center shadow-sm">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 shadow-inner">
                     <img src={e.receiptUrl} className="w-full h-full object-cover grayscale" alt="Bill" />
                   </div>
                   <div>
                     <p className="font-black text-slate-900 tracking-tight">{e.description}</p>
                     <p className="text-[10px] font-black uppercase text-blue-500 tracking-widest">{e.category}</p>
                   </div>
                 </div>
                 <div className="text-right">
                    <p className="font-black text-xl text-slate-900 tracking-tighter">${e.amount.toLocaleString()}</p>
                    <span className="text-[9px] font-black uppercase text-orange-500 tracking-widest">{e.status}</span>
                 </div>
               </div>
             ))}
           </div>
         </div>
      )}
    </div>
  );
};

const StatCardSmall = ({ label, value, color }: any) => (
  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
     <p className={`text-4xl font-black tracking-tighter ${color}`}>{value}</p>
  </div>
);

export default SalesModule;
