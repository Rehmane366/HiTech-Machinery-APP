
import React, { useState } from 'react';
import { Task, Recommendation, Expense, User, CustomerRecord, VisitLog } from '../types';

interface TechnicalModuleProps {
  user: User;
  tasks: Task[];
  updateTaskStatus: (id: string, status: Task['status']) => void;
  addRecommendation: (rec: Recommendation) => void;
  recommendations: Recommendation[];
  addExpense: (expense: Expense) => void;
  expenses: Expense[];
  // Added missing customers prop
  customers: CustomerRecord[];
  // Fix: Added missing visit log related props to match usage in App.tsx
  visitLogs: VisitLog[];
  addVisitLog: (log: VisitLog) => void;
  updateVisitLog: (id: string, data: Partial<VisitLog>) => void;
}

const TechnicalModule: React.FC<TechnicalModuleProps> = ({ 
  user, tasks, updateTaskStatus, addRecommendation, recommendations, addExpense, expenses, customers,
  visitLogs, addVisitLog, updateVisitLog
}) => {
  const [showRecForm, setShowRecForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);

  const handleRecommendationSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const clientName = formData.get('clientName') as string;
    const customer = customers.find(c => c.name === clientName);

    const newRec: Recommendation = {
      id: `R${Date.now()}`,
      techId: user.id,
      techName: user.name,
      customerId: customer?.id || 'PROSPECT',
      customerName: clientName,
      productName: formData.get('productName') as string,
      estimatedProfit: Number(formData.get('profit')),
      date: new Date().toLocaleDateString()
    };
    addRecommendation(newRec);
    setShowRecForm(false);
    alert("Recommendation logged. Potential profit tracked by Admin.");
  };

  const submitExpense = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newExp: Expense = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      amount: Number(formData.get('amount')),
      category: formData.get('category') as any,
      description: formData.get('description') as string,
      status: 'Pending',
      date: new Date().toLocaleDateString(),
      receiptUrl: 'https://picsum.photos/400/500?random=tech' + Math.random()
    };
    addExpense(newExp);
    setShowExpenseForm(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight italic">Engineering Ops</h1>
          <p className="text-slate-500 font-medium">Precision field service and parts auditing</p>
        </div>
        <div className="text-right">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pipeline Generated</p>
           <p className="text-2xl font-black text-emerald-600 tracking-tighter italic">+${recommendations.reduce((a, b) => a + b.estimatedProfit, 0)}</p>
        </div>
      </header>

      {/* Task Directives */}
      <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
        <h2 className="text-xl font-black mb-6 flex items-center gap-3 relative z-10">
           <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
           Assigned Engineering Tasks
        </h2>
        <div className="space-y-4 relative z-10">
          {tasks.map(task => (
            <div key={task.id} className="bg-white/5 border border-white/10 p-6 rounded-3xl group transition-all hover:bg-white/10">
               <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-black text-lg text-indigo-300">{task.clientName}</h4>
                    <p className="text-slate-400 text-sm font-medium">{task.description}</p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[9px] font-black uppercase text-slate-500 border border-white/10 px-2 py-0.5 rounded">{task.taskType}</span>
                    </div>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    task.status === 'Completed' ? 'bg-emerald-500 text-slate-950' :
                    task.status === 'In Progress' ? 'bg-indigo-600 text-white animate-pulse' :
                    'bg-white/10 text-slate-400'
                  }`}>
                    {task.status}
                  </span>
               </div>
               {task.status !== 'Completed' && (
                 <button 
                   onClick={() => updateTaskStatus(task.id, task.status === 'Assigned' ? 'In Progress' : 'Completed')}
                   className="w-full py-3 bg-white text-slate-950 font-black rounded-xl text-sm transition-transform active:scale-95 shadow-lg shadow-white/5"
                 >
                   {task.status === 'Assigned' ? 'Clock In at Job Site' : 'Verify Resolution & Finish'}
                 </button>
               )}
            </div>
          ))}
          {tasks.length === 0 && <p className="text-slate-500 italic font-bold text-center py-10">No pending technical tasks.</p>}
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Upsell / Recommendation Module */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-black text-slate-900 tracking-tighter">Opportunities Log</h3>
             <button onClick={() => setShowRecForm(!showRecForm)} className="text-indigo-600 font-black text-xs uppercase tracking-widest">{showRecForm ? 'Close' : '+ Log Opportunity'}</button>
           </div>
           
           {showRecForm ? (
             <form onSubmit={handleRecommendationSubmit} className="space-y-4 animate-in zoom-in-95 duration-300">
               {/* Updated clientName to use select with customers prop */}
               <select name="clientName" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-semibold">
                 <option value="">-- Choose Client --</option>
                 {customers.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
                 <option value="New Prospect">New Prospect</option>
               </select>
               <input name="productName" type="text" required placeholder="Recommended Machine/Part" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" />
               <input name="profit" type="number" required placeholder="Estimated Profit Value ($)" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none" />
               <button type="submit" className="w-full py-5 bg-indigo-600 text-white font-black rounded-2xl shadow-xl">Secure Opportunity</button>
             </form>
           ) : (
             <div className="space-y-4 flex-1 overflow-y-auto max-h-[300px] pr-2">
                {recommendations.map(r => (
                  <div key={r.id} className="p-4 bg-slate-50 rounded-2xl flex justify-between items-center">
                    <div>
                      <p className="font-black text-slate-900">{r.productName}</p>
                      <p className="text-[10px] font-black uppercase text-indigo-400">{r.customerName}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-emerald-600 tracking-tighter">+${r.estimatedProfit}</p>
                    </div>
                  </div>
                ))}
             </div>
           )}
        </div>

        {/* Technical Expenses */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-xl font-black text-slate-900 tracking-tighter">Incident Expenses</h3>
             <button onClick={() => setShowExpenseForm(!showExpenseForm)} className="text-indigo-600 font-black text-xs uppercase tracking-widest">{showExpenseForm ? 'Close' : '+ New Claim'}</button>
           </div>
           {showExpenseForm ? (
             <form onSubmit={submitExpense} className="space-y-4 animate-in slide-in-from-right duration-300">
                <div className="grid grid-cols-2 gap-4">
                  <input name="amount" type="number" step="0.01" required placeholder="Amount" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                  <select name="category" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                    <option value="Tools">Tool/Part Replace</option>
                    <option value="Fuel">Fuel</option>
                    <option value="Food">Meals</option>
                    <option value="Rent">Lodging</option>
                  </select>
                </div>
                <input name="description" type="text" required placeholder="Purpose" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
                <button type="submit" className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl">Log Part/Incident Claim</button>
             </form>
           ) : (
             <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
               {expenses.map(exp => (
                 <div key={exp.id} className="p-4 border border-slate-50 rounded-2xl flex justify-between items-center bg-slate-50/50">
                    <div>
                      <p className="font-bold text-slate-900">{exp.description}</p>
                      <p className="text-[10px] font-black text-indigo-400 uppercase">{exp.category}</p>
                    </div>
                    <div className="text-right">
                       <p className="font-black text-slate-900 tracking-tighter">${exp.amount}</p>
                       <span className={`text-[10px] font-black uppercase ${exp.status === 'Approved' ? 'text-emerald-500' : 'text-amber-500'}`}>{exp.status}</span>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default TechnicalModule;
