import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, UploadCloud, FileText, CheckCircle, Clock } from 'lucide-react';

const API_BASE = "http://localhost:5201/api";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "System sync completed successfully", time: "2m ago" },
    { id: 2, text: "New priority ticket TCK-1005 created", time: "15m ago" }
  ]);

  const fetchTickets = async () => {
    try {
      const res = await fetch(`${API_BASE}/Tickets`);
      const data = await res.json();
      setTickets(data);
    } catch (err) { console.error("API Error", err); }
  };

  useEffect(() => { fetchTickets(); }, []);

  const stats = [
    { label: 'Open', val: tickets.filter(t => t.statusId === 1).length, color: 'blue' },
    { label: 'In Progress', val: tickets.filter(t => t.statusId === 2).length, color: 'amber' },
    { label: 'Resolved', val: tickets.filter(t => t.statusId === 4).length, color: 'emerald' },
    { label: 'Total', val: tickets.length, color: 'indigo' }
  ];

  return (
    <div className="min-h-screen bg-[#0c0e17] text-slate-100 p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Dashboard 👋</h1>
          <p className="text-slate-400 text-sm">System Overview</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Notification Center */}
          <div className="relative group">
            <button className="p-3 bg-[#161a2b] border border-slate-800 rounded-full hover:border-indigo-500">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="absolute right-0 mt-2 w-64 bg-[#161a2b] border border-slate-800 rounded-xl p-4 hidden group-hover:block z-50">
              <h4 className="text-xs font-bold uppercase mb-2">Recent Notifications</h4>
              {notifications.map(n => (
                <p key={n.id} className="text-[10px] text-slate-400 py-1 border-b border-slate-800">{n.text}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-[#161a2b] rounded-2xl border border-slate-800 flex justify-between items-center">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-black">{stat.label}</p>
              <h3 className="text-4xl font-black mt-1">{stat.val}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Analytics Chart */}
        <div className="col-span-2 bg-[#161a2b] rounded-2xl border border-slate-800 p-6">
          <h3 className="font-black text-sm mb-4 uppercase text-slate-300">Ticket Volume Analytics</h3>
          <div className="h-48">
            <ResponsiveContainer width="30%" height="100%">
              <BarChart data={tickets}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="referenceNo" hide />
                <Tooltip contentStyle={{ backgroundColor: '#0c0e17' }} />
                <Bar dataKey="statusId" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* File Attachment Module */}
        <div className="bg-[#161a2b] rounded-2xl border border-slate-800 p-6 flex flex-col justify-center items-center text-center border-dashed border-indigo-500/30">
          <UploadCloud className="text-indigo-500 mb-2" size={40} />
          <h3 className="text-sm font-black mb-1">Evidence Upload</h3>
          <p className="text-[10px] text-slate-500 mb-4">Attach screenshots or logs</p>
          <input type="file" accept='+++' className="text-[10px] w-full text-slate-400 file:bg-indigo-600 file:text-white file:rounded-lg file:border-none file:px-3 file:py-1" />
        </div>
      </div>

      {/* Recent Tickets Table */}
      <div className="bg-[#161a2b] rounded-2xl border border-slate-800 p-6">
        <h3 className="font-black text-sm mb-4 uppercase text-slate-300">Recent Tickets</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] text-slate-500 uppercase border-b border-slate-800">
              <th className="pb-3">ID</th>
              <th className="pb-3">Subject</th>
              <th className="pb-3">Status</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {tickets.map(t => (
              <tr key={t.id} className="border-b border-slate-800/50">
                <td className="py-4 font-mono text-indigo-400">{t.referenceNo}</td>
                <td className="py-4">{t.title}</td>
                <td className="py-4">
                  <span className={`px-2 py-1 rounded-full ${t.statusId === 4 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-800'}`}>
                    {t.statusId === 4 ? 'Resolved' : 'Active'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}