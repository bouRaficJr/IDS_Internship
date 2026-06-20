import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // State Management
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [commentText, setCommentText] = useState('');
  
  // Edit Lifecycle States
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const [localComments, setLocalComments] = useState([
    { id: 1, author: 'Sarah Jenkins', avatar: 'SJ', isSystem: false, text: 'This is blocking our entire marketing team from logging in. Urgent help needed!', time: '1 day ago' },
    { id: 2, author: 'System Bot', avatar: '🤖', isSystem: true, text: 'Ticket auto-assigned to Tier 2 Engineering via dispatch engines.', time: '1 day ago' }
  ]);

  useEffect(() => {
    const fetchTicketData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5201/api/tickets/${id}`, {
          method: 'GET',
          headers: { 'Accept': '*/*', 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`Failed to locate target record: ${response.status}`);
        const data = await response.json();
        setTicket(data);
        setEditForm(data); 
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTicketData();
  }, [id]);

  const updateStatusOnBackend = async (newStatus) => {
    if (!ticket) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5201/api/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...ticket, status: newStatus })
      });
      if (!response.ok) throw new Error("Status transition failed");
      setTicket(await response.json());
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5201/api/tickets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editForm)
      });
      if (!response.ok) throw new Error("Update failed");
      setTicket(await response.json());
      setIsEditing(false);
    } catch (err) {
      alert(`Update Error: ${err.message}`);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Confirm permanent deletion of this ticket?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5201/api/tickets/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Delete failed");
      navigate('/tickets');
    } catch (err) {
      alert(`Delete Error: ${err.message}`);
    }
  };

  const handlePostComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setLocalComments([...localComments, { id: Date.now(), author: 'You', avatar: 'AJ', isSystem: false, text: commentText, time: 'Just now' }]);
    setCommentText('');
  };

  if (isLoading) return <div className="min-h-screen bg-slate-950 p-6 flex items-center justify-center text-slate-400">Loading...</div>;
  if (errorMessage || !ticket) return <div className="min-h-screen bg-slate-950 p-6 text-rose-400 flex items-center justify-center">{errorMessage || "Ticket not found"}</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 space-y-6 font-sans relative">
      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        
        {/* Header Section with Edit/Delete Controls */}
        <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl shadow-2xl">
          {isEditing ? (
            <div className="space-y-4">
              <input className="w-full bg-slate-950 p-3 border border-slate-700 rounded-lg text-white" value={editForm.title} onChange={e => setEditForm({...editForm, title: e.target.value})} />
              <textarea className="w-full bg-slate-950 p-3 border border-slate-700 rounded-lg text-white" rows="4" value={editForm.description} onChange={e => setEditForm({...editForm, description: e.target.value})}></textarea>
              <div className="flex gap-3">
                <button onClick={handleUpdate} className="px-5 py-2 bg-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-500 transition-all">Update</button>
                <button onClick={() => setIsEditing(false)} className="px-5 py-2 bg-slate-700 rounded-xl font-bold text-xs hover:bg-slate-600 transition-all">Cancel</button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-black text-white">{ticket.title}</h1>
              <p className="text-slate-300 mt-2">{ticket.description}</p>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setIsEditing(true)} className="px-5 py-2 bg-amber-600 rounded-xl font-bold text-xs hover:bg-amber-500 transition-all">Edit</button>
                <button onClick={handleDelete} className="px-5 py-2 bg-rose-600 rounded-xl font-bold text-xs hover:bg-rose-500 transition-all">Delete</button>
              </div>
            </div>
          )}
        </div>

        {/* Existing Grid Layout for Comments & Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 space-y-6">
             <div className="space-y-4">
                <h3 className="font-bold text-xs uppercase text-slate-400">Activity Logs</h3>
                {localComments.map(c => (
                  <div key={c.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                    <p className="text-sm font-bold">{c.author}</p>
                    <p className="text-slate-400 text-sm">{c.text}</p>
                  </div>
                ))}
                <form onSubmit={handlePostComment} className="flex gap-2">
                  <input className="flex-1 bg-slate-900 p-3 rounded-lg border border-slate-800" value={commentText} onChange={e => setCommentText(e.target.value)} placeholder="Reply..." />
                  <button type="submit" className="bg-indigo-600 px-4 py-2 rounded-lg text-xs font-bold">Post</button>
                </form>
             </div>
           </div>

           <div className="p-6 bg-slate-900/70 border border-slate-800 rounded-2xl h-fit">
             <h3 className="text-xs uppercase font-bold text-slate-400 mb-4">Operations</h3>
             <div className="grid grid-cols-3 gap-2">
                <button onClick={() => updateStatusOnBackend('Open')} className="bg-slate-950 p-2 rounded text-[10px] border border-slate-800">Open</button>
                <button onClick={() => updateStatusOnBackend('InProgress')} className="bg-slate-950 p-2 rounded text-[10px] border border-slate-800">Progress</button>
                <button onClick={() => updateStatusOnBackend('Resolved')} className="bg-slate-950 p-2 rounded text-[10px] border border-slate-800">Resolve</button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}