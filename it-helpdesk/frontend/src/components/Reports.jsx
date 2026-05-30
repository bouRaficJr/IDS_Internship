import React from 'react';

export default function Reports() {
  const metrics = [
    { label: 'First Contact Time SLA', value: '42 mins', target: 'Target: < 4 hours', color: 'from-emerald-400 to-teal-500' },
    { label: 'Avg Full Resolution Cycle', value: '18.4 hrs', target: 'Target: < 24 hours', color: 'from-emerald-400 to-teal-500' },
    { label: 'SLA Breach Rate', value: '1.45%', target: 'Target: < 5%', color: 'from-emerald-400 to-teal-500' }
  ];

  const distribution = [
    { cat: 'SSO & Okta Authentication Integration', success: 42, failure: 2 },
    { cat: 'Stripe Double Invoicing & Refunds', success: 84, failure: 0 },
    { cat: 'Mobile Upload Attachment Bugs', success: 19, failure: 3 },
    { cat: 'Webhooks & API Gateway Signatures', success: 56, failure: 1 }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-8 relative overflow-hidden font-sans">
      
      {/* Decorative Premium Ambient Glow Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header Block Section */}
        <div className="space-y-1 ml-1">
          <h2 className="text-2xl font-black text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Analytics & SLA Diagnostics
          </h2>
          <p className="text-sm text-slate-400">
            Performance logs, average resolution periods, and system metrics compliance.
          </p>
        </div>

        {/* SLA Metric Widget Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {metrics.map((m, idx) => (
            <div 
              key={idx} 
              className="p-6 bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/20 hover:border-slate-700/60 transition-all duration-200 group"
            >
              <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">
                {m.label}
              </span>
              <h4 className={`text-3xl font-black mt-3 bg-gradient-to-r ${m.color} bg-clip-text text-transparent tracking-tight`}>
                {m.value}
              </h4>
              <p className="text-xs text-slate-500 font-medium mt-2 flex items-center gap-1.5">
                <span className="h-1 w-1 bg-slate-600 rounded-full inline-block group-hover:bg-emerald-500 transition-colors" />
                {m.target}
              </p>
            </div>
          ))}
        </div>

        {/* Analytics Distribution Stack Data */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Resolution Metric Metrics Panel */}
          <div className="p-6 bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl space-y-6">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-white tracking-wide">
                Resolution Success Count (Last 30 days)
              </h3>
              <p className="text-xs text-slate-400">Proportional throughput logs by technical group.</p>
            </div>

            <div className="space-y-5">
              {distribution.map((r, i) => {
                const total = r.success + r.failure;
                const successWidth = total > 0 ? (r.success / total) * 100 : 0;
                const failureWidth = total > 0 ? (r.failure / total) * 100 : 0;

                return (
                  <div key={i} className="space-y-2 text-xs group">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                      <span className="font-semibold text-slate-300 group-hover:text-white transition-colors">
                        {r.cat}
                      </span>
                      <span className="text-slate-400 font-medium whitespace-nowrap bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800/50 self-start sm:self-center">
                        Resolved <span className="text-emerald-400 font-bold">{r.success}</span> vs Error <span className="text-rose-400 font-bold">{r.failure}</span>
                      </span>
                    </div>
                    {/* Visual Segmented Progress Tracking Bar */}
                    <div className="w-full bg-slate-950 h-3 rounded-xl overflow-hidden flex border border-slate-800/40 p-[2px]">
                      {successWidth > 0 && (
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-l-md transition-all duration-500" 
                          style={{ width: `${successWidth}%` }}
                        />
                      )}
                      {failureWidth > 0 && (
                        <div 
                          className="bg-gradient-to-r from-rose-500 to-red-600 h-full rounded-r-md transition-all duration-500" 
                          style={{ width: `${failureWidth}%` }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Audit Compliance System Logs Terminal Feed */}
          <div className="p-6 bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-xl space-y-6">
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-white tracking-wide">
                SLA Audit Compliance Feed
              </h3>
              <p className="text-xs text-slate-400">Real-time gateway webhook intercept status feed logs.</p>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-900 shadow-inner hover:border-slate-800/80 transition-all flex justify-between items-center gap-4">
                <span className="text-emerald-400 font-medium flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  [PASSED] TCK-1004 resolved within 11 hrs
                </span>
                <span className="text-slate-500 text-[11px] tracking-wider whitespace-nowrap">2026-05-20</span>
              </div>
              
              <div className="p-4 bg-slate-950/80 rounded-xl border border-indigo-500/10 shadow-inner hover:border-amber-500/20 transition-all flex justify-between items-center gap-4">
                <span className="text-amber-400 font-medium flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-amber-500 rounded-full" />
                  [WARNING] TCK-1002 nearing Okta response limit
                </span>
                <span className="text-slate-500 text-[11px] tracking-wider whitespace-nowrap">2026-05-21</span>
              </div>

              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-900 shadow-inner hover:border-slate-800/80 transition-all flex justify-between items-center gap-4">
                <span className="text-emerald-400 font-medium flex items-center gap-2">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full" />
                  [PASSED] TCK-1003 assigned Emma Watson in 24m
                </span>
                <span className="text-slate-500 text-[11px] tracking-wider whitespace-nowrap">2026-05-19</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}