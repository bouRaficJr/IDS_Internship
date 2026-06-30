import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateTicket() {
  const navigate = useNavigate();
  
  // Mappings for your database IDs
  const categories = { "Authentication": 1, "Billing": 2, "Mobile App": 3, "API Support": 4, "General Support": 5 };
  const priorities = { "Low": 1, "Medium": 2, "High": 3, "Critical": 4 };
  const statuses = { "Open": 1, "InProgress": 2, "Resolved": 4 };

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

    const userJson = localStorage.getItem('user');
    const user = userJson ? JSON.parse(userJson) : { id: 1 }; 
    const token = localStorage.getItem('token');

    // Matches your C# Model properties exactly
    const payload = {
      referenceNo: `TKT-${Math.floor(Math.random() * 9000) + 1000}`, // Required field
      title: ticket.title,
      description: ticket.description,
      createdBy: parseInt(user.id),
      categoryId: categories[ticket.category],
      priorityId: priorities[ticket.priority],
      statusId: statuses["Open"]
    };

    try {
      const response = await fetch('http://localhost:5201/api/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `Status ${response.status}: Failed to save to database`);
      }

      navigate('/tickets');
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 flex items-center justify-center font-sans">
      <form onSubmit={handleSubmit} className="max-w-2xl w-full p-8 bg-slate-900/70 border border-slate-800 rounded-2xl space-y-6">
        <h2 className="text-2xl font-black text-white">Lodge Incident Report</h2>
        
        {errorMessage && <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-4 rounded-xl text-xs text-center">{errorMessage}</div>}

        <div className="grid grid-cols-2 gap-6">
          <select value={ticket.category} onChange={(e) => setTicket({ ...ticket, category: e.target.value })} className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-white text-sm">
            {Object.keys(categories).map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={ticket.priority} onChange={(e) => setTicket({ ...ticket, priority: e.target.value })} className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-white text-sm">
            {Object.keys(priorities).map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </div>

        <input type="text" required value={ticket.title} onChange={(e) => setTicket({ ...ticket, title: e.target.value })} placeholder="Subject" className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-white text-sm" />
        <textarea rows="5" required value={ticket.description} onChange={(e) => setTicket({ ...ticket, description: e.target.value })} placeholder="Description" className="w-full px-4 py-3 border border-slate-800 rounded-xl bg-slate-950 text-white text-sm resize-none"></textarea>

        <button type="submit" disabled={isLoading} className="w-full px-6 py-3 bg-indigo-600 rounded-xl font-bold">
          {isLoading ? 'Processing...' : 'Create & Allocate Ticket'}
        </button>
      </form>
    </div>
  );
}