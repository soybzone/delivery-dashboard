import React, { useState } from 'react';
import './App.css';

// Placeholder components for now
const ImportTab = () => <div>📁 Upload your CSV/Excel files here.</div>;
const DashboardTab = () => <div>📊 View performance reports here.</div>;
const HistoryTab = () => <div>🗂️ See previously uploaded files.</div>;

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="App">
      {/* Top Company Header */}
      <div className="company-header">
        <p>Buffalo Wings & Rings DXB</p>
      </div>

      {/* Branding / Portal Title */}
      <header className="app-header">
        <h1>🍽️ Restaurant Delivery Analytics</h1>
      </header>

      {/* Navigation Tabs */}
      <nav className="tab-nav">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={activeTab === 'dashboard' ? 'active' : ''}
        >
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('import')}
          className={activeTab === 'import' ? 'active' : ''}
        >
          Import Data
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={activeTab === 'history' ? 'active' : ''}
        >
          History
        </button>
      </nav>

      {/* Filter Bar */}
      <div className="filter-bar">
        <select>
          <option>Platform: All</option>
          <option>Talabat</option>
          <option>Careem</option>
          <option>Noon Food</option>
        </select>

        <select>
          <option>Status: All</option>
          <option>Delivered</option>
          <option>Failed</option>
        </select>

        <input type="text" placeholder="Select Date Range..." readOnly />
      </div>

      {/* Main Content */}
      <main className="app-main">
        {activeTab === 'import' && <ImportTab />}
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'history' && <HistoryTab />}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>© 2025 Restaurant Delivery Analytics Portal</p>
      </footer>
    </div>
  );
}

export default App;