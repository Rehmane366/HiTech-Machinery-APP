
import React, { useState } from 'react';
import { Complaint, Promotion } from '../types';
import { MOCK_PROMOTIONS } from '../constants';
import { summarizeComplaint } from '../services/geminiService';

interface CustomerModuleProps {
  complaints: Complaint[];
  setComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>;
}

const CustomerModule: React.FC<CustomerModuleProps> = ({ complaints, setComplaints }) => {
  const [subject, setSubject] = useState('');
  const [desc, setDesc] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const aiSummary = await summarizeComplaint(desc);

    const newComplaint: Complaint = {
      id: Math.random().toString(36).substr(2, 9),
      customerId: 'current-user',
      customerName: 'You',
      subject,
      description: desc,
      status: 'Open',
      date: new Date().toLocaleDateString(),
      aiSummary
    };

    setComplaints([newComplaint, ...complaints]);
    setSubject('');
    setDesc('');
    setIsSubmitting(false);
    alert("Support request received by HiTech Machinery Engineering. A technical expert has been assigned.");
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-24">
      <header className="text-center md:text-left">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase leading-none">Fleet Management Portal</h1>
        <p className="text-slate-500 font-bold uppercase text-[11px] tracking-[0.4em] mt-3 opacity-80">HiTech Machinery Partnership Oversight</p>
      </header>

      {/* Active Support Feed */}
      <section className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50/50 rounded-full translate-x-10 -translate-y-10" />
        <h2 className="text-2xl font-black text-slate-900 mb-10 flex items-center gap-5 relative z-10 italic uppercase tracking-tight">
          <div className="w-2.5 h-10 bg-[#f26522] rounded-full" />
          Active Engineering Tickets
        </h2>
        <div className="space-y-6 relative z-10">
           {complaints.length === 0 ? (
             <p className="text-slate-300 text-lg font-black italic py-10 opacity-40 text-center uppercase tracking-[0.2em]">No operational incidents reported.</p>
           ) : (
             complaints.map(c => (
               <div key={c.id} className="p-8 border border-slate-50 bg-slate-50/50 rounded-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-6 hover:bg-white hover:shadow-xl transition-all border-l-4 border-l-blue-600">
                  <div className="space-y-1.5">
                    <h4 className="font-black text-slate-900 text-xl tracking-tight">{c.subject}</h4>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">{c.date} • TICKET ID: {c.id.toUpperCase()}</p>
                    {c.aiSummary && <p className="text-sm text-blue-600 font-bold mt-2 italic leading-relaxed">Action Plan: {c.aiSummary}</p>}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] shadow-sm border ${
                      c.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                      'bg-blue-50 text-blue-600 border-blue-100 animate-pulse'
                    }`}>
                      {c.status === 'Open' ? 'IN QUEUE' : c.status}
                    </span>
                  </div>
               </div>
             ))
           )}
        </div>
      </section>

      {/* New Service Request */}
      <section className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-[#1e4e8c] to-[#f26522]" />
        <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tighter uppercase italic">Technical Dispatch Request</h2>
        <form onSubmit={handleSubmit} className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase text-slate-500 tracking-[0.3em] ml-6 opacity-70">Fleet Category</label>
              <input type="text" required value={subject} onChange={e => setSubject(e.target.value)} className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:bg-white outline-none font-bold text-slate-900 text-lg shadow-sm" placeholder="Hydraulic System / CNC Module" />
            </div>
            <div className="space-y-3 flex flex-col justify-end">
               <p className="text-xs text-slate-400 font-semibold italic opacity-80 mb-6">Dispatch priority will be determined based on partner tier and severity of incident.</p>
            </div>
          </div>
          <div className="space-y-3">
            <label className="text-[11px] font-black uppercase text-slate-500 tracking-[0.3em] ml-6 opacity-70">Incident Diagnostics</label>
            <textarea required rows={5} value={desc} onChange={e => setDesc(e.target.value)} className="w-full px-8 py-6 bg-slate-50 border border-slate-100 rounded-[2.5rem] focus:ring-4 focus:ring-blue-500/10 focus:bg-white outline-none resize-none font-bold text-slate-900 text-lg shadow-sm" placeholder="Provide precise behavioral anomalies..." />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full py-6 bg-[#1e4e8c] hover:brightness-110 text-white font-black rounded-[2.5rem] shadow-2xl shadow-blue-900/10 transition-all active:scale-[0.98] disabled:opacity-50 uppercase tracking-[0.3em] text-sm">
            {isSubmitting ? 'SECURE CHANNEL ESTABLISHED...' : 'LOG ENGINEERING TICKET'}
          </button>
        </form>
      </section>

      {/* Fleet Upgrades */}
      <section>
        <h2 className="text-2xl font-black text-slate-900 mb-10 italic uppercase tracking-tight flex items-center gap-4">
           <div className="w-2.5 h-10 bg-slate-900 rounded-full" />
           Corporate Fleet Upgrades
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {MOCK_PROMOTIONS.map(promo => (
            <div key={promo.id} className="group relative overflow-hidden rounded-[3.5rem] shadow-2xl h-[450px]">
              <img src={promo.image} alt={promo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent p-12 flex flex-col justify-end">
                <h3 className="text-white font-black text-3xl italic tracking-tighter leading-none mb-3">{promo.title}</h3>
                <p className="text-slate-200 text-base mt-2 font-bold opacity-90 leading-relaxed max-w-md">{promo.description}</p>
                <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
                   <div className="space-y-1">
                      <p className="text-[10px] uppercase font-black tracking-widest text-blue-400">CORPORATE WINDOW</p>
                      <p className="text-sm font-black text-white italic tracking-widest">{promo.expiry}</p>
                   </div>
                   <button className="px-10 py-4 bg-white text-[#0f172a] text-xs font-black rounded-2xl hover:scale-105 transition-all shadow-xl uppercase tracking-widest">Reserve Audit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerModule;
