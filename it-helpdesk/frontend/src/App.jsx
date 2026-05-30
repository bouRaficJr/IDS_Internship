import React, { useState } from 'react';

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

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to false to test login screen
  const [currentPage, setCurrentPage] = useState('login');
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  // Helper function to switch views easily from any component
  const navigateTo = (page, ticketId = null) => {
    if (ticketId) setSelectedTicketId(ticketId);
    setCurrentPage(page);
  };

  // 2. Render the correct page dynamically based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login navigateTo={navigateTo} />;
      case 'dashboard':
        return <Dashboard navigateTo={navigateTo} />;
      case 'tickets':
        return <TicketList navigateTo={navigateTo} />;
      case 'ticket-details':
        return <TicketDetails ticketId={selectedTicketId} navigateTo={navigateTo} />;
      case 'create-ticket':
        return <CreateTicket navigateTo={navigateTo} />;
      case 'reports':
        return <Reports />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <UserProfile />;
      case 'admin':
        return <AdminSettings />;
      default:
        return <Dashboard navigateTo={navigateTo} />;
    }
  };

  // If user is not logged in, force render the standalone Login page
  if (!isLoggedIn) {
    return <Login onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className={darkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-850'}>
      <div className="flex min-h-screen">
        
        {/* =========================================================
            YOUR LAYOUT / SIDEBAR WRAPPER
           ========================================================= */}
        <aside className="w-64 border-r border-slate-800 p-4 space-y-2 bg-slate-900">
          <h2 className="text-xl font-bold p-2 text-indigo-400">IT-HelpDesk</h2>
          
          <nav className="space-y-1">
            <button onClick={() => navigateTo('dashboard')} className={`w-full text-left p-2 rounded ${currentPage === 'dashboard' ? 'bg-indigo-600' : ''}`}>Dashboard</button>
            <button onClick={() => navigateTo('ticket-details')} className={`w-full text-left p-2 rounded ${currentPage === 'ticket-details' ? 'bg-indigo-600' : ''}`}>TicketDetails</button>
            <button onClick={() => navigateTo('tickets')} className={`w-full text-left p-2 rounded ${currentPage === 'tickets' ? 'bg-indigo-600' : ''}`}>Ticket List</button>
            <button onClick={() => navigateTo('create-ticket')} className={`w-full text-left p-2 rounded ${currentPage === 'create-ticket' ? 'bg-indigo-600' : ''}`}>Create Ticket</button>
            <button onClick={() => navigateTo('reports')} className={`w-full text-left p-2 rounded ${currentPage === 'reports' ? 'bg-indigo-600' : ''}`}>Reports & SLA</button>
            <button onClick={() => navigateTo('notifications')} className={`w-full text-left p-2 rounded ${currentPage === 'notifications' ? 'bg-indigo-600' : ''}`}>Notifications</button>
            <button onClick={() => navigateTo('profile')} className={`w-full text-left p-2 rounded ${currentPage === 'profile' ? 'bg-indigo-600' : ''}`}>User Profile</button>
            <button onClick={() => navigateTo('admin')} className={`w-full text-left p-2 rounded ${currentPage === 'admin' ? 'bg-indigo-600' : ''}`}>Admin Settings</button>
          </nav>
          
          <div className="pt-8">
            <button onClick={() => setIsLoggedIn(false)} className="w-full text-left p-2 text-rose-400 hover:bg-rose-950/30 rounded">Logout</button>
          </div>
        </aside>

        {/* =========================================================
            DYNAMIC VIEWPORTS CONTROLLER
           ========================================================= */}
        <main className="flex-1 p-6">
          {renderPage()}
        </main>

      </div>
    </div>
  );
}