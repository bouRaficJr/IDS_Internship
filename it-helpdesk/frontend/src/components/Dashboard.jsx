import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Bell, UploadCloud, Clock, Paperclip } from 'lucide-react'; 
import * as XLSX from 'xlsx';
// ⚙️ Linked directly to your custom "sevices" folder spelling
import { fetchTickets } from "../sevices/apis/dashboard.api.js";

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [isExporting, setIsExporting] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date()); 
  const [notifications] = useState([
    { id: 1, text: "Database context linked successfully", time: "Just now" },
    { id: 2, text: "All relationship tables mapped cleanly", time: "5m ago" }
  ]);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await fetchTickets();
        console.log("Raw API response received by Dashboard:", data);

        if (data) {
          if (Array.isArray(data)) {
            setTickets(data);
          } else if (data.data && Array.isArray(data.data)) {
            setTickets(data.data);
          } else if (data.$values && Array.isArray(data.$values)) {
            setTickets(data.$values);
          }
        }
      } catch (err) {
        console.error("Component Error loading tickets from database:", err);
      }
    };

    loadTickets();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Safe fallback resolver for extracting the name property out of the joined table object
  const getStatusString = (ticket) => {
    if (ticket.status && (ticket.status.name || ticket.status.Name)) {
      return ticket.status.name || ticket.status.Name;
    }
    // Hard fallback system if table record lacks a relation join value
    switch(Number(ticket.statusId ?? ticket.status_id ?? ticket.StatusId)) {
      case 1: return 'New';
      case 2: return 'In Progress';
      case 3: return 'Pending';
      case 4: return 'Resolved';
      case 5: return 'Closed';
      default: return 'Active';
    }
  };

  const getStatusColorClass = (statusStr) => {
    const normalized = String(statusStr).toLowerCase();
    if (normalized.includes('new')) return 'bg-blue-500/10 text-blue-400';
    if (normalized.includes('progress')) return 'bg-cyan-500/10 text-cyan-400';
    if (normalized.includes('pending')) return 'bg-slate-500/20 text-slate-400';
    if (normalized.includes('resolved')) return 'bg-emerald-500/10 text-emerald-400';
    if (normalized.includes('closed')) return 'bg-zinc-500/20 text-zinc-400';
    return 'bg-indigo-500/10 text-indigo-400';
  };

  const handleExportToExcel = () => {
    if (tickets.length === 0) {
      alert("No database records available to export!");
      return;
    }
    setIsExporting(true);
    try {
      const formattedData = tickets.map((t, index) => ({
        "Serial No": index + 1,
        "Ticket Reference": t.referenceNo ?? t.reference_no ?? t.ReferenceNo ?? "N/A",
        "Subject Title": t.title ?? t.Title ?? "No Subject",
        "Current Status Name": getStatusString(t),
        "File Attachment Path": t.attachmentUrl ?? t.attachment_url ?? t.AttachmentUrl ?? "No File Uploaded"
      }));

      const worksheet = XLSX.utils.json_to_sheet(formattedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Database Live Tickets");
      XLSX.writeFile(workbook, `Tickets_DB_Export_${new Date().toISOString().split('T')[0]}.xlsx`);
    } catch (error) {
      console.error("Failed to compile Excel file from DB data:", error);
    } finally {
      setIsExporting(false);
    }
  };

  // 📊 CALCULATE CARDS DYNAMICALLY VIA JOINED STATUS VALUES
  const stats = [
    { label: 'New', val: tickets.filter(t => getStatusString(t).toLowerCase().includes('new')).length },
    { label: 'In Progress', val: tickets.filter(t => getStatusString(t).toLowerCase().includes('progress')).length },
    { label: 'Pending', val: tickets.filter(t => getStatusString(t).toLowerCase().includes('pending')).length },
    { label: 'Total Tickets', val: tickets.length }
  ];

  // 📊 PREPARE CHART ANALYTICS USING COMBINED TABLE STATUS FIELD VALUE
  const prepareChartData = () => {
    const counts = { 'New': 0, 'In Progress': 0, 'Pending': 0, 'Resolved': 0, 'Closed': 0 };
    tickets.forEach(t => {
      const statusName = getStatusString(t);
      Object.keys(counts).forEach(key => {
        if (statusName.toLowerCase().includes(key.toLowerCase())) {
          counts[key]++;
        }
      });
    });

    return Object.keys(counts).map(name => ({
      status: name,
      'Count': counts[name]
    }));
  };

  return (
    <div className="min-h-screen bg-[#0c0e17] text-slate-100 p-6 font-sans">
      {/* Header Panel */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Dashboard 👋</h1>
          <p className="text-slate-400 text-sm">System Overview</p>
          <div className="flex items-center gap-2.5 bg-[#161a2b] border border-slate-800/80 px-3.5 py-1.5 rounded-xl text-xs font-medium text-slate-400 shadow-sm w-fit mt-3">
            <Clock size={13} className="text-indigo-400" />
            <div className="flex gap-2 font-mono">
              <span>{currentTime.toLocaleDateString()}</span>
              <span className="text-indigo-300">{currentTime.toLocaleTimeString()}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <button className="p-3 bg-[#161a2b] border border-slate-800 rounded-full hover:border-indigo-500 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full"></span>
            </button>
            <div className="absolute right-0 mt-2 w-64 bg-[#161a2b] border border-slate-800 rounded-xl p-4 hidden group-hover:block z-50 shadow-xl">
              <h4 className="text-xs font-bold uppercase mb-2 text-indigo-400">Recent Updates</h4>
              {notifications.map(n => (
                <div key={n.id} className="text-[10px] py-1.5 border-b border-slate-800 last:border-0">
                  <p className="text-slate-300">{n.text}</p>
                  <span className="text-slate-500 font-mono text-[9px]">{n.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="p-6 bg-[#161a2b] rounded-2xl border border-slate-800">
            <p className="text-[10px] text-slate-400 uppercase font-black">{stat.label}</p>
            <h3 className="text-4xl font-black mt-1">{stat.val}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Chart View */}
        <div className="col-span-2 bg-[#161a2b] rounded-2xl border border-slate-800 p-6">
          <h3 className="font-black text-sm mb-4 uppercase text-slate-300">Ticket Status Distribution (DB Joined Analytics)</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={prepareChartData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="status" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} allowDecimals={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0c0e17', borderRadius: '8px', borderColor: '#1e293b', color: '#f8fafc' }} />
                <Bar dataKey="Count" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={42} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Export Data Utility */}
        <div className="bg-[#161a2b] rounded-2xl border border-slate-800 p-6 flex flex-col justify-center items-center text-center">
          <UploadCloud className="text-emerald-400 mb-2 animate-pulse" size={40} />
          <h3 className="text-sm font-black mb-1">Database Reporting</h3>
          <p className="text-[10px] text-slate-400 mb-4 px-2">Compile and extract live dataset components to external sheets</p>
          <button 
            onClick={handleExportToExcel}
            disabled={isExporting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition duration-200"
          >
            {isExporting ? "Generating Spreadsheet..." : "Download Tickets Excel Sheet"}
          </button>
        </div>
      </div>

      {/* Live Joined Recent Tickets Table */}
      <div className="bg-[#161a2b] rounded-2xl border border-slate-800 p-6">
        <h3 className="font-black text-sm mb-4 uppercase text-slate-300">Recent Table Tickets ({tickets.length})</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-[10px] text-slate-500 uppercase border-b border-slate-800">
              <th className="pb-3">ID Reference</th>
              <th className="pb-3">Subject</th>
              <th className="pb-3 text-center">Attachment</th>
              <th className="pb-3 text-right">Status (From Statuses Table)</th>
            </tr>
          </thead>
          <tbody className="text-xs">
            {tickets.map((t, idx) => {
              const displayStatus = getStatusString(t);
              const fileLink = t.attachmentUrl ?? t.attachment_url ?? t.AttachmentUrl;

              return (
                <tr key={t.id ?? idx} className="border-b border-slate-800/50 hover:bg-slate-800/20">
                  <td className="py-4 font-mono text-indigo-400">{t.referenceNo ?? t.reference_no ?? t.ReferenceNo ?? 'N/A'}</td>
                  <td className="py-4 font-medium text-slate-200">{t.title ?? t.Title}</td>
                  <td className="py-4 text-center">
                    {fileLink ? (
                      <a 
                        href={fileLink} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 transition-colors"
                        title="View Document"
                      >
                        <Paperclip size={14} />
                        <span className="text-[10px] font-medium underline">View File</span>
                      </a>
                    ) : (
                      <span className="text-slate-600 font-mono text-[10px]">-</span>
                    )}
                  </td>
                  <td className="py-4 text-right">
                    <span className={`px-2 py-1 rounded-full font-semibold text-[10px] ${getStatusColorClass(displayStatus)}`}>
                      {displayStatus}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}