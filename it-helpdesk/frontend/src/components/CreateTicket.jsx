import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateTicket() {
  const navigate = useNavigate();
  
  // Note: Changed 'subject' to 'title' to match the C# API properties exactly!
  const [ticket, setTicket] = useState({ 
    title: '', 
    category: 'Authentication', 
    priority: 'Medium', 
    description: '' 
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    // Fetch your logged-in user profile from localStorage to find who created it
    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : { id: 1 }; 
    const token = localStorage.getItem('token');

    const payload = {
      title: ticket.title,
      category: ticket.category,
      priority: ticket.priority,
      description: ticket.description,
      status: "Open", // Default starting lifecycle state
      createdById: user.id // Tie this ticket to the logged-in agent
    };

    try {
      const response = await fetch('http://localhost:5201/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
          'Authorization': `Bearer ${token}` // Sends your JWT key cleanly
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Server rejected request with status code: ${response.status}`);
      }

      // Successful addition! Send operator back to the incident queue screen
      navigate('/tickets');

    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscard = () => {
    setTicket({ title: '', category: 'Authentication', priority: 'Medium', description: '' });
    navigate('/tickets');
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
            Lodge Incident Report Ticket
          </h2>
          <p className="text-sm text-slate-400">
            Immediately queue a diagnostic or billing ticket for team allocation.
          </p>
        </div>

        {/* Premium Form Card Panel */}
        <form 
          onSubmit={handleSubmit} 
          className="p-8 bg-slate-900/70 border border-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/40 space-y-6"
        >
          {/* Error Banner System if transmission snaps */}
          {errorMessage && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-xs font-semibold text-center">
              {errorMessage}
            </div>
          )}

          {/* Metadata Selection Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2 ml-1">
                Issue Category
              </label>
              <select
                value={ticket.category}
                onChange={(e) => setTicket({ ...ticket, category: e.target.value })}
                className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 cursor-pointer"
              >
                <option value="Authentication">Authentication</option>
                <option value="Billing">Billing</option>
                <option value="Mobile App">Mobile App</option>
                <option value="API Support">API Support</option>
                <option value="General Support">General Support</option>
              </select>
            </div>
            <div>
              <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2 ml-1">
                Incident Urgency
              </label>
              <select
                value={ticket.priority}
                onChange={(e) => setTicket({ ...ticket, priority: e.target.value })}
                className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-white text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 cursor-pointer"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
          </div>

          {/* Subject Line Entry */}
          <div>
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2 ml-1">
              Short Subject Summary
            </label>
            <input
              type="text"
              required
              value={ticket.title}
              onChange={(e) => setTicket({ ...ticket, title: e.target.value })}
              placeholder="e.g. Postgres DB replicas lag exceeds 40 seconds warning"
              className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
            />
          </div>

          {/* Text Area Diagnostic Entry */}
          <div>
            <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider block mb-2 ml-1">
              Detailed Diagnostics Description
            </label>
            <textarea
              rows="5"
              required
              value={ticket.description}
              onChange={(e) => setTicket({ ...ticket, description: e.target.value })}
              placeholder="Describe the steps to reproduce the incident, payload examples, and immediate tenant impact..."
              className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200 resize-none leading-relaxed"
            ></textarea>
          </div>

          {/* Action Submission Footer Blocks */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/40">
            <button 
              type="button" 
              onClick={handleDiscard}
              className="text-xs text-slate-400 hover:text-white font-semibold bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 transition-all"
            >
              Cancel & Discard
            </button>
            <button 
              type="submit" 
              disabled={isLoading}
              className={`px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-500 hover:from-indigo-500 hover:to-violet-400 active:from-indigo-700 active:to-violet-600 text-xs font-bold rounded-xl text-white transition-all shadow-lg shadow-indigo-600/10 hover:shadow-indigo-600/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Queuing System Asset...' : 'Create & Allocate Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}