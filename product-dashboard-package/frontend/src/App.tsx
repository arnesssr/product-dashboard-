import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import TopNavigation from './components/layout/TopNavigation';
import Dashboard from './pages/Dashboard';
import AddProduct from './pages/AddProduct';
import Settings from './pages/Settings';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 ml-64">
          <TopNavigation />
          <main className="p-8 mt-16">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products/add" element={<AddProduct />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
