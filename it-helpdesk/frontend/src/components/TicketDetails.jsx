import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function TicketDetails() {
  const { id } = useParams(); // Grabs the URL index ID parameter
  const navigate = useNavigate();

  // Network State Management Architecture
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [commentText, setCommentText] = useState('');

  // Local state array placeholder for frontend comments mock engine
  const [localComments, setLocalComments] = useState([
    { id: 1, author: 'Sarah Jenkins', avatar: 'SJ', isSystem: false, text: 'This is blocking our entire marketing team from logging in. Urgent help needed!', time: '1 day ago' },
    { id: 2, author: 'System Bot', avatar: '🤖', isSystem: true, text: 'Ticket auto-assigned to Tier 2 Engineering via dispatch engines.', time: '1 day ago' }
  ]);

  // Fetch the specific asset payload matching the target database index
  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5201/api/tickets/${id}`, {
          method: 'GET',
          headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to locate target item record metadata. Server response: ${response.status}`);
        }

        const data = await response.json();
        setTicket(data);
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTicketData();
  }, [id]);

  // Core status advance lifecycle logic engine pushing structural changes to backend via HTTP PUT
  const updateStatusOnBackend = async (newStatus) => {
    if (!ticket) return;
    
    try {
      const token = localStorage.getItem('token');
      const payload = {
        id: ticket.id,
        title: ticket.title,
        description: ticket.description,
        category: ticket.category,
        priority: ticket.priority,
        status: newStatus, // Set our advanced lifecycle stage name
        createdById: ticket.createdById
      };

      const response = await fetch(`http://localhost:5201/api/tickets/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`State pipeline transition failed. System code returned: ${response.status}`);
      }

      const updatedTicketData = await response.json();
      setTicket(updatedTicketData); // Sync UI state with backend confirmed data

    } catch (err) {
      alert(`Pipeline error encounter: ${err.message}`);
    }
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    // Appends to local comment timeline track arrays
    setLocalComments([
      ...localComments,
      { id: Date.now(), author: 'Alex Johnson (You)', avatar: 'AJ', isSystem: false, text: commentText, time: 'Just now' }
    ]);
    setCommentText('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-400 p-6 flex items-center justify-center font-sans">
        <div className="animate-pulse font-semibold text-sm">Decoding diagnostic telemetry indices for node assignment...</div>
      </div>
    );
  }

  if (errorMessage || !ticket) {
    return (
      <div className="min-h-screen bg-slate-950 text-rose-400 p-6 flex flex-col items-center justify-center font-sans space-y-4">
        <div className="text-sm font-bold bg-rose-500/10 border border-rose-500/20 px-4 py-3 rounded-xl">{errorMessage || "Target ticket payload vector returned null."}</div>
        <button onClick={() => navigate('/tickets')} className="text-xs text-slate-400 hover:text-white underline font-semibold">&larr; Return to main table layout index</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-6 relative overflow-hidden font-sans">
      
      {/* Decorative Premium Ambient Glow Elements */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-violet-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 ml-1">
          <button onClick={() => navigate('/tickets')} className="hover:text-white transition-colors flex items-center gap-1">
            <span>&larr;</span> Back to Incident Matrix List
          </button>
          <span className="text-slate-700">/</span>
          <span className="text-indigo-400 font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/10">
            #{ticket.id}
          </span>
        </div>

        {/* Workspace Dual Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Left Columns: Core Payload Summary & Timeline Activity Logs */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Primary Description Context Card */}
            <div className="p-6 bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/40 pb-3">
                <span className="text-xs font-mono font-bold text-indigo-400 tracking-wider">
                  SYSTEM CORE INTERCEPT
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {new Date(ticket.createdAt).toLocaleString()}
                </span>
              </div>
              <h1 className="text-xl font-black text-white tracking-tight">
                {ticket.title}
              </h1>
              <p className="text-slate-300 text-sm leading-relaxed font-medium whitespace-pre-wrap">
                {ticket.description}
              </p>
            </div>

            {/* Responses/Activity Logs Stack Tracker */}
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 ml-1">
                Activity Logs & Responses ({localComments.length})
              </h3>
              
              <div className="space-y-3">
                {localComments.map((comment) => (
                  <div 
                    key={comment.id} 
                    className={`p-5 rounded-2xl border backdrop-blur-sm shadow-xl flex gap-4 transition-all ${
                      comment.isSystem 
                        ? 'bg-slate-950/40 border-slate-900/60 opacity-80' 
                        : 'bg-slate-900/50 border-slate-800/80'
                    }`}
                  >
                    {/* User Node Profile Bubble */}
                    <div className={`h-9 w-9 rounded-xl shrink-0 flex items-center justify-center font-bold text-xs border shadow-sm ${
                      comment.isSystem
                        ? 'bg-slate-950 border-slate-800 text-slate-400'
                        : comment.author.includes('(You)')
                        ? 'bg-gradient-to-br from-indigo-600 to-violet-500 border-indigo-400/20 text-white'
                        : 'bg-slate-800 border-slate-700 text-slate-200'
                    }`}>
                      {comment.avatar}
                    </div>

                    {/* Metadata Content Block */}
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                        <strong className={comment.isSystem ? 'text-slate-400 font-semibold' : 'text-white font-bold'}>
                          {comment.author}
                        </strong>
                        <span className="text-slate-500 font-medium">• {comment.time}</span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed font-medium">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Real-time Interaction Input Form Block */}
              <form onSubmit={handlePostComment} className="flex gap-3 mt-4 items-center">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write your diagnostic reply or comment update here..."
                  className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm text-white placeholder-slate-600 transition-all duration-200 shadow-inner"
                />
                <button 
                  type="submit" 
                  className="px-5 py-3 bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 text-xs font-bold text-white rounded-xl transition-all shadow-md shadow-indigo-600/10 shrink-0"
                >
                  Post Reply
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Status Lifecycle Actions & Incident Diagnostics Metadata */}
          <div className="space-y-6">
            
            {/* Actionable Pipeline Controller State Widget */}
            <div className="p-6 bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 space-y-5">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Operational Status Actions
              </h3>
              
              <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800/40 text-xs font-semibold">
                <span className="text-slate-400 font-medium">Lifecycle Stage:</span>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider shadow-sm border ${
                  ticket.status === 'Open' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20 animate-pulse' :
                  ticket.status === 'InProgress' || ticket.status === 'In Progress' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                }`}>
                  {ticket.status === 'InProgress' ? 'In Progress' : ticket.status}
                </span>
              </div>

              <div className="space-y-2.5">
                <p className="text-[10px] uppercase font-bold tracking-wider text-slate-500 ml-0.5">
                  Advance Lifespan Track:
                </p>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                  <button 
                    onClick={() => updateStatusOnBackend('Open')}
                    className={`py-2.5 rounded-xl border transition-all active:scale-95 text-center text-[11px] ${
                      ticket.status === 'Open' 
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/60 shadow-lg shadow-rose-500/5' 
                        : 'bg-slate-950 text-slate-400 border-slate-800/60 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    Open
                  </button>
                  <button 
                    onClick={() => updateStatusOnBackend('InProgress')}
                    className={`py-2.5 rounded-xl border transition-all active:scale-95 text-center text-[11px] ${
                      ticket.status === 'InProgress' || ticket.status === 'In Progress'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60 shadow-lg shadow-amber-500/5' 
                        : 'bg-slate-950 text-slate-400 border-slate-800/60 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    Progress
                  </button>
                  <button 
                    onClick={() => updateStatusOnBackend('Resolved')}
                    className={`py-2.5 rounded-xl border transition-all active:scale-95 text-center text-[11px] ${
                      ticket.status === 'Resolved' || ticket.status === 'Resolve'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/60 shadow-lg shadow-emerald-500/5' 
                        : 'bg-slate-950 text-slate-400 border-slate-800/60 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    Resolve
                  </button>
                </div>
              </div>
            </div>

            {/* Strict Property Spec Sheet Panel */}
            <div className="p-6 bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 space-y-4 text-xs">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Incident Properties
              </h3>
              
              <div className="divide-y divide-slate-800/60 font-medium">
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-slate-400">Reporter Identity Token:</span>
                  <span className="font-bold text-white text-right">User #{ticket.createdById}</span>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-slate-400">Assigned Expert Node:</span>
                  <span className="font-bold text-indigo-400 text-right">Tier 2 Dispatcher</span>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-slate-400">Category Node:</span>
                  <span className="font-bold text-white text-right">{ticket.category}</span>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <span className="text-slate-400">Urgency Standard:</span>
                  <span className={`font-black px-2 py-0.5 rounded border tracking-wide uppercase text-[10px] ${
                    ticket.priority === 'Critical' ? 'text-rose-400 bg-rose-500/10 border-rose-500/20' :
                    ticket.priority === 'High' ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' :
                    'text-slate-400 bg-slate-950 border-slate-800'
                  }`}>
                    {ticket.priority}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}