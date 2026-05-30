import React, { useState } from 'react';

export default function UserProfile() {
  const [profile, setProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.johnson@saasdesk.io',
    role: 'Senior Support Lead',
    phone: '+1 (555) 019-2834',
    notifyEmail: true,
    notifySlack: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    // Save routine integration pipeline placeholder
    console.log('Synchronizing user state matrix:', profile);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Decorative Premium Ambient Glow Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-2xl w-full space-y-6 relative z-10">
        
        {/* Header Block Section */}
        <div className="space-y-1 ml-1">
          <h2 className="text-2xl font-black text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Agent Profile Settings
          </h2>
          <p className="text-sm text-slate-400">
            Manage your identity variables, incident dispatch nodes, and workspace permissions.
          </p>
        </div>

        {/* Core Configuration Panel */}
        <form onSubmit={handleSave} className="p-6 sm:p-8 bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 space-y-6">
          
          {/* Identity Card Bar */}
          <div className="flex items-center gap-5 border-b border-slate-800/50 pb-6">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-500 p-[2px] shadow-xl shadow-indigo-950/40 shrink-0">
              <div className="h-full w-full bg-slate-950 rounded-[14px] flex items-center justify-center font-black text-2xl text-white tracking-wider">
                AJ
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="font-black text-lg text-white tracking-tight">
                {profile.name || 'Anonymous Operator'}
              </h3>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md">
                  {profile.role}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-slate-500 font-medium">Active Session</span>
              </div>
            </div>
          </div>

          {/* Explicit Parameter Input Field Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block ml-0.5">
                Full Operator Name
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white transition-all duration-150 shadow-inner"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block ml-0.5">
                Assigned Email Matrix
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white transition-all duration-150 shadow-inner"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-slate-400 text-xs font-bold uppercase tracking-wider block ml-0.5">
                Direct Contact Line
              </label>
              <input
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-white transition-all duration-150 shadow-inner"
              />
            </div>
          </div>

          {/* Interactive Routing Dispatch Flags */}
          <div className="space-y-4 pt-6 border-t border-slate-800/50">
            <div className="space-y-0.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Alert Dispatch Preferences
              </h4>
              <p className="text-xs text-slate-500">Configure event streams for real-time ticket escalation boundaries.</p>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 p-3.5 bg-slate-950/40 hover:bg-slate-950/80 rounded-xl border border-slate-800/40 hover:border-slate-800 transition-all cursor-pointer group">
                <input
                  type="checkbox"
                  checked={profile.notifyEmail}
                  onChange={(e) => setProfile({ ...profile, notifyEmail: e.target.checked })}
                  className="mt-0.5 h-4 w-4 bg-slate-950 border-slate-800 rounded text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-slate-900 cursor-pointer"
                />
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors block">
                    Email Notification Digests
                  </span>
                  <span className="text-[11px] text-slate-400 block leading-normal">
                    Dispatch automated processing reports regarding nearing SLA breaches and queue updates.
                  </span>
                </div>
              </label>

              <label className="flex items-start gap-3 p-3.5 bg-slate-950/40 hover:bg-slate-950/80 rounded-xl border border-slate-800/40 hover:border-slate-800 transition-all cursor-pointer group">
                <input
                  type="checkbox"
                  checked={profile.notifySlack}
                  onChange={(e) => setProfile({ ...profile, notifySlack: e.target.checked })}
                  className="mt-0.5 h-4 w-4 bg-slate-950 border-slate-800 rounded text-indigo-600 focus:ring-indigo-500/20 focus:ring-offset-slate-900 cursor-pointer"
                />
                <div className="space-y-0.5">
                  <span className="text-xs font-semibold text-slate-200 group-hover:text-white transition-colors block">
                    Slack Live Payload Hooks
                  </span>
                  <span className="text-[11px] text-slate-400 block leading-normal">
                    Stream continuous webhook JSON payloads immediately upon new inbound incident handshakes.
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Action Trigger Footers */}
          <div className="flex justify-end pt-2">
            <button 
              type="submit" 
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 active:from-indigo-700 active:to-violet-600 text-xs font-bold text-white rounded-xl transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20"
            >
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}