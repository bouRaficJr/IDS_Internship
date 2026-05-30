import React, { useState } from 'react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    orgName: 'SaaSDesk International Ltd',
    slaTargetHours: 4,
    autoAssign: true,
    apiLogsEnabled: true
  });

  const handleSave = (e) => {
    e.preventDefault();
    // This is ready to be connected to a fetch() call to your .NET backend later!
    console.log('Saving settings to backend:', settings);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex items-center justify-center relative overflow-hidden font-sans">
      
      {/* Decorative Premium Ambient Glow Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-2xl w-full space-y-6 relative z-10">
        
        {/* Header Section */}
        <div className="space-y-1 ml-1">
          <h2 className="text-2xl font-black text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Workspace Administration
          </h2>
          <p className="text-sm text-slate-400">
            Configure global SLAs, auto-assignment engines, and system diagnostics.
          </p>
        </div>

        {/* Configuration Card Panel */}
        <form 
          onSubmit={handleSave} 
          className="p-8 bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 space-y-8"
        >
          {/* Main Input Settings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2 ml-1">
                Company Workspace Domain
              </label>
              <input
                type="text"
                value={settings.orgName}
                onChange={(e) => setSettings({ ...settings, orgName: e.target.value })}
                className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
              />
            </div>
            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2 ml-1">
                Max SLA Response Limit (Hours)
              </label>
              <input
                type="number"
                value={settings.slaTargetHours}
                onChange={(e) => setSettings({ ...settings, slaTargetHours: parseInt(e.target.value) || 4 })}
                className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Automated Dispatch Engines Block */}
          <div className="space-y-4 pt-6 border-t border-slate-800/60">
            <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider ml-1">
              Automated Dispatch Engines
            </h4>
            
            {/* Control Toggle Row 1 */}
            <div className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800/40 rounded-xl backdrop-blur-sm hover:border-slate-800 transition-all group">
              <div className="space-y-0.5 pr-4">
                <h5 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                  Enable Ticket Auto-Allocation
                </h5>
                <p className="text-xs text-slate-400">
                  Route tickets to agent queues based on real-time availability logs.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.autoAssign}
                onChange={(e) => setSettings({ ...settings, autoAssign: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500/30 border-slate-800 rounded bg-slate-950 cursor-pointer checked:bg-indigo-600 checked:border-transparent transition-all shrink-0"
              />
            </div>

            {/* Control Toggle Row 2 */}
            <div className="flex items-center justify-between p-4 bg-slate-950/60 border border-slate-800/40 rounded-xl backdrop-blur-sm hover:border-slate-800 transition-all group">
              <div className="space-y-0.5 pr-4">
                <h5 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                  System API Audit Logs
                </h5>
                <p className="text-xs text-slate-400">
                  Log all incoming and outgoing webhook status payloads.
                </p>
              </div>
              <input
                type="checkbox"
                checked={settings.apiLogsEnabled}
                onChange={(e) => setSettings({ ...settings, apiLogsEnabled: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500/30 border-slate-800 rounded bg-slate-950 cursor-pointer checked:bg-indigo-600 checked:border-transparent transition-all shrink-0"
              />
            </div>
          </div>

          {/* Action Submission Footer Button */}
          <div className="flex justify-end pt-4 border-t border-slate-800/40">
            <button 
              type="submit" 
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 active:from-indigo-700 active:to-violet-600 text-xs font-bold rounded-xl text-white transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Apply Workspace Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}