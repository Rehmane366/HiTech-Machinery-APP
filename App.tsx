
import React, { useState } from 'react';
import Layout from './components/Layout';
import AdminDashboard from './components/AdminDashboard';
import CustomerModule from './components/CustomerModule';
import SalesModule from './components/SalesModule';
import TechnicalModule from './components/TechnicalModule';
import { User, UserRole, Task, Expense, Recommendation, Complaint, CustomerRecord, VisitLog } from './types';
import { INITIAL_USERS, INITIAL_CUSTOMERS } from './constants';
import { Logo } from './constants';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [error, setError] = useState('');

  // Enterprise Global State
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [customers, setCustomers] = useState<CustomerRecord[]>(INITIAL_CUSTOMERS);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [visitLogs, setVisitLogs] = useState<VisitLog[]>([]);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>, isAdminFlow: boolean) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
      if (isAdminFlow && user.role !== UserRole.ADMIN) {
        setError('Unauthorized administrative access attempt.');
        return;
      }
      setCurrentUser(user);
      setError('');
    } else {
      setError('Invalid enterprise credentials.');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowAdminLogin(false);
  };

  // Dispatchers
  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status, completedAt: status === 'Completed' ? new Date().toLocaleDateString() : undefined } : t));
  };

  const addTask = (task: Task) => setTasks(prev => [task, ...prev]);
  const addExpense = (expense: Expense) => setExpenses(prev => [expense, ...prev]);
  const updateExpenseStatus = (id: string, status: Expense['status']) => setExpenses(prev => prev.map(e => e.id === id ? { ...e, status } : e));
  const addRecommendation = (rec: Recommendation) => setRecommendations(prev => [rec, ...prev]);
  const addCustomer = (customer: CustomerRecord) => setCustomers(prev => [customer, ...prev]);
  const addUser = (newUser: User) => setUsers(prev => [...prev, newUser]);
  const addVisitLog = (log: VisitLog) => setVisitLogs(prev => [log, ...prev]);
  const updateVisitLog = (id: string, data: Partial<VisitLog>) => setVisitLogs(prev => prev.map(l => l.id === id ? { ...l, ...data } : l));

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-md w-full bg-white rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-1000">
          <div className="flex flex-col items-center mb-10 text-center">
            <Logo className="w-40 h-40 mb-4 transition-transform hover:scale-105 duration-500" />
            <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic leading-none">HiTech Machinery</h1>
            <p className="text-blue-600 font-bold text-[10px] uppercase tracking-[0.4em] mt-3 opacity-80">Enterprise Command Suite</p>
          </div>

          <form onSubmit={(e) => handleLogin(e, showAdminLogin)} className="space-y-6">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">System Identity</label>
              <input name="username" type="text" required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all font-bold text-slate-900 shadow-sm" placeholder="Username" />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-4">Access Key</label>
              <input name="password" type="password" required className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all font-bold text-slate-900 shadow-sm" placeholder="••••••••" />
            </div>

            {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-[10px] font-black text-center border border-red-100 animate-pulse uppercase tracking-widest leading-relaxed">{error}</div>}

            <button type="submit" className={`w-full py-5 ${showAdminLogin ? 'bg-slate-900' : 'bg-[#1e4e8c]'} hover:brightness-110 active:scale-[0.98] text-white font-black rounded-2xl shadow-xl shadow-blue-900/10 transition-all uppercase tracking-widest text-xs`}>
              AUTHENTICATE SESSION
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 flex flex-col items-center gap-4">
            <button onClick={() => { setShowAdminLogin(!showAdminLogin); setError(''); }} className="text-blue-600 text-[10px] font-black hover:text-blue-800 transition-colors uppercase tracking-widest">
              {showAdminLogin ? 'Return to Personnel Login' : 'Administrator Management Portal'}
            </button>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.3em] opacity-60">© 2024 HiTech Machinery Global</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout user={currentUser} onLogout={handleLogout}>
      {currentUser.role === UserRole.ADMIN && (
        <AdminDashboard 
          tasks={tasks} addTask={addTask} 
          expenses={expenses} updateExpenseStatus={updateExpenseStatus} 
          recommendations={recommendations} 
          complaints={complaints}
          customers={customers} addCustomer={addCustomer}
          users={users} addUser={addUser}
          visitLogs={visitLogs}
        />
      )}
      {currentUser.role === UserRole.CUSTOMER && <CustomerModule complaints={complaints} setComplaints={setComplaints} />}
      {currentUser.role === UserRole.SALES && (
        <SalesModule 
          user={currentUser} tasks={tasks.filter(t => t.assignedToId === currentUser.id)} 
          updateTaskStatus={updateTaskStatus} 
          addExpense={addExpense} expenses={expenses.filter(e => e.userId === currentUser.id)}
          customers={customers}
          visitLogs={visitLogs.filter(v => v.userId === currentUser.id)}
          addVisitLog={addVisitLog}
          updateVisitLog={updateVisitLog}
          recommendations={recommendations.filter(r => r.techId === currentUser.id)}
        />
      )}
      {currentUser.role === UserRole.TECHNICAL && (
        <TechnicalModule 
          user={currentUser} tasks={tasks.filter(t => t.assignedToId === currentUser.id)}
          updateTaskStatus={updateTaskStatus}
          addRecommendation={addRecommendation} recommendations={recommendations.filter(r => r.techId === currentUser.id)}
          addExpense={addExpense} expenses={expenses.filter(e => e.userId === currentUser.id)}
          customers={customers}
          visitLogs={visitLogs.filter(v => v.userId === currentUser.id)}
          addVisitLog={addVisitLog}
          updateVisitLog={updateVisitLog}
        />
      )}
    </Layout>
  );
};

export default App;
