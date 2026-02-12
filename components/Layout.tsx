
import React, { useState } from 'react';
import { UserRole, User } from '../types';
import { ICONS, Logo } from '../constants';

interface LayoutProps {
  user: User;
  onLogout: () => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-50">
      {/* Sidebar - Mobile Toggle */}
      <div className="md:hidden bg-[#0f172a] text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" />
          <h1 className="text-xl font-black italic tracking-tighter">HiTech Machinery</h1>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-white/5 rounded-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 transition-transform duration-500 ease-in-out
        fixed md:static inset-y-0 left-0 w-72 bg-[#0f172a] text-slate-100 z-40 flex flex-col shadow-2xl
      `}>
        <div className="p-10 flex flex-col items-center">
          <Logo className="w-28 h-28 mb-4 hover:scale-105 transition-transform cursor-pointer" />
          <h1 className="text-2xl font-black tracking-tighter text-white italic leading-tight text-center">HiTech Machinery</h1>
          <p className="text-[9px] text-blue-400 font-black uppercase tracking-[0.3em] mt-2 opacity-80 text-center">Global Suite</p>
        </div>

        <nav className="flex-1 px-6 space-y-4">
          <div className="py-8 border-t border-white/5">
            <p className="px-2 text-[10px] font-black text-slate-500 uppercase mb-5 tracking-[0.2em]">Deployment Identity</p>
            <div className="bg-white/5 p-5 rounded-[1.5rem] border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors group cursor-default">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center font-black text-white shadow-xl group-hover:scale-110 transition-transform">
                {user.name.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <p className="font-black text-sm truncate text-white tracking-tight">{user.name}</p>
                <p className="text-[9px] bg-blue-500/20 text-blue-400 inline-block px-3 py-0.5 rounded-full mt-1.5 font-black uppercase tracking-widest border border-blue-500/30">
                  {user.role}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-2 flex flex-col gap-2">
             <SidebarItem icon={<ICONS.Dashboard />} label="CONTROL CENTER" active={true} />
          </div>
        </nav>

        <div className="p-8 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-5 py-4 text-xs font-black text-red-400 hover:bg-red-500/10 rounded-2xl transition-all uppercase tracking-[0.2em] border border-transparent hover:border-red-500/20"
          >
            <ICONS.LogOut />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`
    w-full flex items-center gap-4 px-5 py-5 rounded-[1.5rem] text-[10px] font-black tracking-[0.15em] transition-all
    ${active ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/20 border border-blue-500' : 'text-slate-400 hover:bg-white/5 hover:text-white'}
  `}>
    <span className={`${active ? 'scale-110' : 'opacity-60'} transition-all`}>{icon}</span>
    <span>{label}</span>
  </button>
);

export default Layout;
