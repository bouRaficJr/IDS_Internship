import React, { useState } from 'react';

// Configuration for Gemini API
const apiKey = "";

export default function Dashboard() {
  const stats = [
    { title: 'Total Active Tickets', count: 12, subtitle: 'Across all departments', icon: '📋', color: 'text-indigo-400' },
    { title: 'Open Tickets', count: 4, subtitle: 'Requires attention', icon: '🔥', color: 'text-rose-400' },
    { title: 'In Progress', count: 5, subtitle: 'Currently being handled', icon: '⚙️', color: 'text-amber-400' },
    { title: 'Resolved Today', count: 3, subtitle: 'Closed successfully', icon: '✅', color: 'text-emerald-400' }
  ];

  const recentIncidents = [
    { id: 'TCK-1002', subject: 'SSO Login Integration Failing with Okta', priority: 'Critical', category: 'Authentication', description: 'Enterprise users receiving intermittent 403 Forbidden errors during SAML verification.', status: 'Open' },
    { id: 'TCK-1003', subject: 'Billing discrepancy on Invoice #2026-04', priority: 'Medium', category: 'Billing', description: 'Customer reports being billed twice for subscription add-ons after stripe account re-sync.', status: 'In Progress' },
    { id: 'TCK-1004', subject: 'Mobile app crash on attachments upload', priority: 'High', category: 'Mobile App', description: 'Application immediately terminates when users upload PNG attachments exceeding 5MB on iOS.', status: 'Resolved' }
  ];

  // Gemini API States
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [activeDraftTicket, setActiveDraftTicket] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Exponential backoff fetch implementation for Gemini API
  const callGeminiWithRetry = async (promptText, systemPrompt, retries = 5, delay = 1000) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;
    const payload = {
      contents: [{ parts: [{ text: promptText }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    for (let i = 0; i < retries; i++) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        const data = await res.json();
        return data;
      } catch (err) {
        if (i === retries - 1) throw err;
        await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
      }
    }
  };

  // 1. Analyze entire incident pipeline
  const handleAnalyzePipeline = async () => {
    setAiLoading(true);
    setErrorMessage(null);
    setAiResponse(null);
    setActiveDraftTicket(null);

    const systemPrompt = "You are an elite Technical Support Operations Director AI. Provide a concise, highly strategic executive summary (in markdown format, no greetings) identifying correlations in current incident data, critical bottlenecks, and clear, actionable steps to avoid SLA breaches.";
    const contextPrompt = `Analyze this backlog of tickets:\n${JSON.stringify(recentIncidents, null, 2)}\nSLA status: Okta integration is at 90% limit breach.`;

    try {
      const result = await callGeminiWithRetry(contextPrompt, systemPrompt);
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        setAiResponse(text);
      } else {
        throw new Error("Empty response payload from Gemini API.");
      }
    } catch (err) {
      setErrorMessage("Failed to generate AI insights. Please ensure the workspace environment has a valid API key configured.");
    } finally {
      setAiLoading(false);
    }
  };

  // 2. Draft Response template for a specific ticket
  const handleDraftResponse = async (ticket) => {
    setAiLoading(true);
    setErrorMessage(null);
    setAiResponse(null);
    setActiveDraftTicket(ticket);

    const systemPrompt = "You are an expert enterprise customer support engineer. Draft a highly technical, polite, and detailed step-by-step troubleshooting response template for the given ticket. Recommend verification steps, logs to gather, and set clear expectations. Keep it ready to copy-paste.";
    const contextPrompt = `Ticket Details:\nID: ${ticket.id}\nSubject: ${ticket.subject}\nCategory: ${ticket.category}\nPriority: ${ticket.priority}\nDescription: ${ticket.description}`;

    try {
      const result = await callGeminiWithRetry(contextPrompt, systemPrompt);
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        setAiResponse(text);
      } else {
        throw new Error("Empty response payload.");
      }
    } catch (err) {
      setErrorMessage("Failed to generate troubleshooting draft. Please try again later.");
    } finally {
      setAiLoading(false);
    }
  };

  // Copy output tool
  const handleCopyText = (text) => {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    const originalText = aiResponse;
    setAiResponse("✓ Copied draft to clipboard successfully!\n\n" + originalText);
    setTimeout(() => setAiResponse(originalText), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-6 relative overflow-hidden font-sans">
      
      {/* Decorative Premium Ambient Glow Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Banner Header Component */}
      <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl shadow-xl shadow-black/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
        <div>
          <h2 className="text-2xl font-black text-white bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Welcome back, Agent!
          </h2>
          <p className="mt-1 text-slate-400 text-sm max-w-xl">
            Workspace SLA metric targets are sitting at 4 hours target response. All incoming ticket pipelines are running smoothly.
          </p>
        </div>
        <button 
          onClick={handleAnalyzePipeline}
          className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 active:from-indigo-700 active:to-violet-600 rounded-xl text-xs font-bold text-white transition-all shadow-lg shadow-indigo-600/10 flex items-center gap-2 shrink-0 border border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
        >
          ✨ Audit Pipeline with AI
        </button>
      </div>

      {/* GEMINI LLM CO-PILOT WORKSPACE MODULE PANEL */}
      {(aiLoading || aiResponse || errorMessage) && (
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-indigo-500/30 shadow-2xl shadow-indigo-950/10 space-y-4 animate-fade-in relative overflow-hidden z-10">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">✨</span>
              <h3 className="font-extrabold text-sm text-indigo-400 uppercase tracking-wider">
                {activeDraftTicket ? `AI Copilot: Drafting Response for ${activeDraftTicket.id}` : "AI Support Co-Pilot Insights"}
              </h3>
            </div>
            <button 
              onClick={() => { setAiResponse(null); setActiveDraftTicket(null); setErrorMessage(null); }}
              className="text-slate-400 hover:text-white text-xs font-semibold bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 hover:border-slate-700 transition-all"
            >
              Close Panel
            </button>
          </div>

          {aiLoading && (
            <div className="py-12 flex flex-col items-center justify-center space-y-3">
              <svg className="animate-spin h-7 w-7 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-xs text-indigo-400 font-mono tracking-wide">Running secure LLM semantic processing...</p>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium text-center">
              {errorMessage}
            </div>
          )}

          {aiResponse && (
            <div className="space-y-4 animate-fade-in">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-slate-300 font-mono text-[13px] leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto shadow-inner">
                {aiResponse}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleCopyText(aiResponse)}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/10"
                >
                  Copy Template Response
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quick Stats Grid Dashboard Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {stats.map((stat, i) => (
          <div key={i} className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md shadow-lg shadow-black/10 flex items-center justify-between transition-all duration-200 hover:border-slate-700 hover:bg-slate-900 group">
            <div className="space-y-1">
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider">{stat.title}</p>
              <h3 className="text-3xl font-black text-white tracking-tight group-hover:scale-105 transition-transform duration-200 origin-left">
                {stat.count}
              </h3>
              <p className="text-[10px] text-slate-500 font-medium">{stat.subtitle}</p>
            </div>
            <div className="h-11 w-11 rounded-xl bg-slate-950 border border-slate-800/60 flex items-center justify-center text-xl shadow-inner shadow-black/40">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* SLA Metrics & Logs Twin Cards Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md shadow-lg lg:col-span-2 space-y-5">
          <h3 className="font-extrabold text-sm text-slate-300 uppercase tracking-wider ml-0.5">SLA Critical Timelines</h3>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs mb-1.5 px-0.5">
                <span className="text-slate-300 font-medium">Okta SSO Authentication Crash</span>
                <span className="text-rose-400 font-bold bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md text-[10px]">90% Limit Breached</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full p-[1px] border border-slate-800/60">
                <div className="bg-gradient-to-r from-rose-600 to-rose-400 h-full rounded-full shadow-[0_0_12px_rgba(244,63,94,0.3)] transition-all duration-500" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5 px-0.5">
                <span className="text-slate-300 font-medium">Billing Invoices Re-calculation Requests</span>
                <span className="text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md text-[10px]">55% Safe Zone</span>
              </div>
              <div className="w-full bg-slate-950 h-2 rounded-full p-[1px] border border-slate-800/60">
                <div className="bg-gradient-to-r from-amber-500 to-yellow-400 h-full rounded-full shadow-[0_0_12px_rgba(245,158,11,0.2)] transition-all duration-500" style={{ width: '55%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md shadow-lg space-y-4">
          <h3 className="font-extrabold text-sm text-slate-300 uppercase tracking-wider">System Logs Summary</h3>
          <div className="space-y-1.5 text-xs font-medium">
            <div className="flex justify-between items-center bg-slate-950/60 border border-slate-800/40 p-2.5 rounded-xl">
              <span className="text-slate-400">API Health Status:</span>
              <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">99.98% OK</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950/60 border border-slate-800/40 p-2.5 rounded-xl">
              <span className="text-slate-400">Total Teams Online:</span>
              <span className="text-white font-bold bg-slate-800 px-2 py-0.5 rounded-md">4 Leads</span>
            </div>
            <div className="flex justify-between items-center bg-slate-950/60 border border-slate-800/40 p-2.5 rounded-xl">
              <span className="text-slate-400">Last Database Sync:</span>
              <span className="text-indigo-400 font-bold bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md">2 mins ago</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Incident Table Data Module Block */}
      <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-md shadow-lg space-y-4 relative z-10">
        <h3 className="font-extrabold text-sm text-slate-300 uppercase tracking-wider ml-0.5">Critical Unresolved Incidents</h3>
        <div className="overflow-x-auto rounded-xl border border-slate-800/60 bg-slate-950/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-[11px] text-slate-400 font-bold uppercase tracking-wider select-none">
                <th className="py-3.5 px-4">ID</th>
                <th className="py-3.5 px-4">Subject & Context</th>
                <th className="py-3.5 px-4">Priority</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Instant AI Assist</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {recentIncidents.map((t) => (
                <tr key={t.id} className="hover:bg-slate-900/40 transition-colors duration-150 group">
                  <td className="py-3.5 px-4 font-mono font-bold text-indigo-400 text-xs">{t.id}</td>
                  <td className="py-3.5 px-4 max-w-sm">
                    <div className="space-y-0.5">
                      <p className="font-semibold text-slate-200 group-hover:text-white transition-colors">{t.subject}</p>
                      <p className="text-[11px] text-slate-400 truncate font-medium">{t.description}</p>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-md border ${
                      t.priority === 'Critical' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 
                      t.priority === 'High' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                      'bg-slate-800 text-slate-300 border-transparent'
                    }`}>{t.priority}</span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 font-medium text-xs">{t.category}</td>
                  <td className="py-3.5 px-4">
                    <span className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                      <span className={`h-2 w-2 rounded-full shadow-lg ${
                        t.status === 'Open' ? 'bg-rose-500 shadow-rose-500/50 animate-pulse' : 
                        t.status === 'In Progress' ? 'bg-amber-500 shadow-amber-500/50' : 
                        'bg-emerald-500 shadow-emerald-500/50'
                      }`}></span>
                      {t.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleDraftResponse(t)}
                      className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-indigo-400 hover:text-white hover:bg-indigo-600 hover:border-transparent rounded-xl text-xs font-bold transition-all duration-150 shadow-inner"
                    >
                      ✨ Draft Reply
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}