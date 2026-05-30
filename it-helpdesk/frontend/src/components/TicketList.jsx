import React, { useState, useMemo } from 'react';

export default function TicketList() {
  const initialTickets = [
    { id: 'TCK-1002', subject: 'SSO Login Integration Failing with Okta', category: 'Authentication', priority: 'Critical', status: 'Open', reporter: 'Sarah Jenkins', assignedTo: 'Alex Johnson' },
    { id: 'TCK-1003', subject: 'Billing discrepancy on Invoice #2026-04', category: 'Billing', priority: 'Medium', status: 'In Progress', reporter: 'Michael Chen', assignedTo: 'Emma Watson' },
    { id: 'TCK-1004', subject: 'Mobile app crash on attachments upload', category: 'Mobile App', priority: 'High', status: 'Resolved', reporter: 'David K.', assignedTo: 'Alex Johnson' },
    { id: 'TCK-1005', subject: 'Request for custom webhook endpoints documentation', category: 'API Support', priority: 'Low', status: 'Open', reporter: 'Samantha Cruz', assignedTo: 'Unassigned' }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('All Priorities');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');

  // Unified Multi-Filter Engine
  const filteredTickets = useMemo(() => {
    return initialTickets.filter(ticket => {
      const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPriority = selectedPriority === 'All Priorities' || ticket.priority === selectedPriority;
      const matchesStatus = selectedStatus === 'All Statuses' || ticket.status === selectedStatus;
      
      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [searchTerm, selectedPriority, selectedStatus]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-6 relative overflow-hidden font-sans">
      
      {/* Decorative Premium Ambient Glow Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        
        {/* Header Block Control Array */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ml-1">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Support Incident Matrix
            </h2>
            <p className="text-sm text-slate-400">
              Audit, search, and allocate enterprise customer support tickets.
            </p>
          </div>
          <button className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 active:from-indigo-700 active:to-violet-600 text-xs font-bold text-white rounded-xl transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 self-start sm:self-center">
            + Lodge New Ticket
          </button>
        </div>

        {/* Real-time Multi-Filter Toolbar Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-5 bg-slate-900/60 rounded-2xl border border-slate-800/80 backdrop-blur-xl shadow-xl">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Search tickets by subject or identifier key..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 placeholder-slate-600 text-white transition-all"
            />
          </div>
          <div>
            <select 
              value={selectedPriority} 
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white cursor-pointer transition-all"
            >
              <option value="All Priorities">All Priorities</option>
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <select 
              value={selectedStatus} 
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white cursor-pointer transition-all"
            >
              <option value="All Statuses">All Statuses</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Main Incident Ledger Grid Container */}
        <div className="bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl shadow-black/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-xs text-slate-400 font-extrabold uppercase tracking-wider bg-slate-900/30">
                  <th className="py-4 px-6">ID</th>
                  <th className="py-4 px-6">Subject & Team Assignments</th>
                  <th className="py-4 px-6">Category Node</th>
                  <th className="py-4 px-6">Urgency Standard</th>
                  <th className="py-4 px-6">Lifecycle Status</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/50 text-sm font-medium">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="py-12 text-center text-sm font-semibold text-slate-500">
                      No customer incident vectors found matching specified filter arrays.
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((t) => (
                    <tr key={t.id} className="hover:bg-slate-900/50 transition-colors duration-150 group">
                      {/* Token Key Node */}
                      <td className="py-4 px-6 font-mono font-bold text-indigo-400 select-all">
                        {t.id}
                      </td>
                      
                      {/* Title & Metadata Block */}
                      <td className="py-4 px-6">
                        <div className="space-y-1 max-w-md">
                          <h4 className="font-bold text-white group-hover:text-indigo-300 transition-colors duration-150 leading-snug">
                            {t.subject}
                          </h4>
                          <p className="text-xs text-slate-400 font-medium">
                            Reporter: <span className="text-slate-300 font-semibold">{t.reporter}</span> • Assigned: <span className="text-slate-300 font-semibold">{t.assignedTo}</span>
                          </p>
                        </div>
                      </td>
                      
                      {/* Category Badge Tag */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs bg-slate-950 border border-slate-800 text-slate-300 rounded-lg">
                          {t.category}
                        </span>
                      </td>
                      
                      {/* Urgency Badge Status Map */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className={`px-2.5 py-1 text-[11px] font-black uppercase tracking-wide rounded-lg border ${
                          t.priority === 'Critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                          t.priority === 'High' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                          'bg-slate-950 text-slate-400 border-slate-800/60'
                        }`}>
                          {t.priority}
                        </span>
                      </td>
                      
                      {/* Active State Ring System */}
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="flex items-center gap-2 text-slate-200">
                          <span className="relative flex h-2 w-2">
                            {t.status === 'Open' && (
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            )}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${
                              t.status === 'Open' ? 'bg-rose-500' : 
                              t.status === 'In Progress' ? 'bg-amber-500' : 
                              'bg-emerald-500'
                            }`} />
                          </span>
                          <span className="text-xs font-semibold">{t.status}</span>
                        </span>
                      </td>
                      
                      {/* Detailed Drawer Actions Target */}
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button className="px-3.5 py-1.5 bg-slate-950 border border-slate-800 hover:border-slate-700 text-xs text-white rounded-lg font-bold transition-all shadow-md">
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}