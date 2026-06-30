import { useState } from 'react';

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Ticket Assigned', message: 'TCK-1005 has been automatically queued for team review.', time: '10 mins ago', read: false },
    { id: 2, title: 'Comment Added', message: 'Emma Watson commented on Billing discrepancy.', time: '18 hrs ago', read: false },
    { id: 3, title: 'System Warning', message: 'API Gateway latencies surged past 350ms average.', time: '1 day ago', read: true }
  ]);

  const markRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearAll = () => setNotifications([]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Decorative Premium Ambient Glow Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-xl w-full space-y-6 relative z-10">
        
        {/* Header Block Section */}
        <div className="flex items-end justify-between border-b border-slate-900 pb-4 ml-1">
          <div className="space-y-1">
            <h2 className="text-2xl font-black text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Alert Hub
            </h2>
            <p className="text-sm text-slate-400">
              Keep track of updates regarding assigned system tickets.
            </p>
          </div>
          {notifications.length > 0 && (
            <button 
              onClick={clearAll} 
              className="text-xs font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl px-3 py-1.5 transition-all duration-150 shrink-0"
            >
              Clear All Logs
            </button>
          )}
        </div>

        {/* Notifications Listing Stack */}
        <div className="space-y-3.5">
          {notifications.length === 0 ? (
            /* Clean High-End Empty State Card */
            <div className="p-12 text-center bg-slate-900/40 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-inner shadow-black/40">
              <span className="text-slate-400 text-sm font-semibold block tracking-wide">
                ✨ Excellent! No pending notifications in queue.
              </span>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-5 rounded-2xl border backdrop-blur-md transition-all duration-200 flex items-start gap-4 group shadow-xl ${
                  n.read 
                    ? 'bg-slate-900/40 border-slate-800/60 text-slate-400 shadow-black/10 opacity-75 hover:opacity-100 hover:border-slate-700/60' 
                    : 'bg-slate-900/80 border-indigo-500/20 text-slate-200 shadow-indigo-950/5 hover:border-indigo-500/40'
                }`}
              >
                {/* Dynamic Status Glow Dot Indicator */}
                <div className="mt-1.5 shrink-0">
                  <span className={`flex h-2.5 w-2.5 rounded-full relative ${n.read ? 'bg-slate-700' : 'bg-indigo-500'}`}>
                    {!n.read && (
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    )}
                  </span>
                </div>

                {/* Notification Context Payload */}
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-4">
                    <h4 className={`font-bold text-sm text-white group-hover:text-indigo-300 transition-colors duration-150`}>
                      {n.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono tracking-wide bg-slate-950/60 border border-slate-800/40 px-2 py-0.5 rounded-md">
                      {n.time}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-300 leading-relaxed pr-2 font-medium">
                    {n.message}
                  </p>
                  
                  {/* Inline Read Management Trigger */}
                  {!n.read && (
                    <div className="pt-2">
                      <button 
                        onClick={() => markRead(n.id)} 
                        className="px-2.5 py-1 text-[10px] font-extrabold text-indigo-400 bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-white rounded-lg transition-all"
                      >
                        Mark as Read
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}