import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';

// 1. Import all of your standalone page components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import TicketList from './components/TicketList';
import TicketDetails from './components/TicketDetails';
import CreateTicket from './components/CreateTicket';
import Reports from './components/Reports';
import Notifications from './components/Notifications';
import UserProfile from './components/UserProfile';
import AdminSettings from './components/AdminSettings';

// Inner component to handle layout logic so we can use hooks like useLocation
function AppContent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set to false to test login screen
  const [darkMode, setDarkMode] = useState(true);
  const location = useLocation();

  // If user is not logged in, force render the standalone Login page
  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  // If we are on the login route, we don't want to display the sidebar layout wrapper
  if (location.pathname === '/login') {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className={darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-850'}>
      <div className="flex min-h-screen">
        
        {/* =========================================================
            YOUR LAYOUT / SIDEBAR WRAPPER (Now using Link instead of buttons)
           ========================================================= */}
        <aside className="w-64 border-r border-slate-800 p-4 space-y-2 bg-slate-900">
          <h2 className="text-xl font-bold p-2 text-indigo-400">IT-HelpDesk</h2>
          
          <nav className="space-y-1">
            <Link to="/dashboard" className={`block w-full p-2 rounded ${location.pathname === '/dashboard' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>Dashboard</Link>
            <Link to="/tickets" className={`block w-full p-2 rounded ${location.pathname === '/tickets' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>Ticket List</Link>
             <Link to="/ticket-details" className={`block w-full p-2 rounded ${location.pathname === '/ticket-details' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>Ticket Details </Link>
            <Link to="/create-ticket" className={`block w-full p-2 rounded ${location.pathname === '/create-ticket' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>Create Ticket</Link>
            <Link to="/reports" className={`block w-full p-2 rounded ${location.pathname === '/reports' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>Reports & SLA</Link>
            <Link to="/notifications" className={`block w-full p-2 rounded ${location.pathname === '/notifications' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>Notifications</Link>
            <Link to="/profile" className={`block w-full p-2 rounded ${location.pathname === '/profile' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>User Profile</Link>
            <Link to="/admin" className={`block w-full p-2 rounded ${location.pathname === '/admin' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-800'}`}>Admin Settings</Link>
          </nav>
          
          <div className="pt-8">
            <button onClick={() => setIsLoggedIn(false)} className="w-full text-left p-2 text-rose-400 hover:bg-rose-950/30 rounded">Logout</button>
          </div>
        </aside>

        {/* =========================================================
            DYNAMIC VIEWPORTS CONTROLLER (Controlled via URL routing)
           ========================================================= */}
        <main className="flex-1 p-6">
          <Routes>
            {/* Handle Base URLs redirects */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login onLoginSuccess={() => setIsLoggedIn(true)} />} />
            
            {/* Main Application Feature Routes */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tickets" element={<TicketList />} />
            <Route path="/ticket-details/:id" element={<TicketDetails />} /> 
            <Route path="/create-ticket" element={<CreateTicket />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/admin" element={<AdminSettings />} />

            {/* Fallback Catch-all Route redirects back to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}

// Main component wraps AppContent with BrowserRouter context safely
export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}