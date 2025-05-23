import React, { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file to upload.');
      return;
    }

    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://delivery-dashboard-backend.onrender.com/upload ', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setReport(result.report);
      } else {
        setError('Failed to process file.');
      }
    } catch (err) {
      setError('Error connecting to server.');
    }

    setLoading(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🚚 Delivery Dashboard</h1>
        <p>Upload your CSV or Excel file below:</p>

        <input type="file" onChange={handleFileChange} accept=".csv, .xlsx, .xls" />
        <br />
        <button onClick={handleUpload} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload File'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {report && (
          <div style={{ marginTop: '30px', textAlign: 'left' }}>
            <h3>📊 Performance Report</h3>

            <p><strong>Total Deliveries:</strong> {report.totalDeliveries}</p>

            <p><strong>Success vs Failed Orders:</strong></p>
            <ul>
              <li style={{ color: 'green' }}>✅ Successful: {report.successCount}</li>
              <li style={{ color: 'red' }}>❌ Failed: {report.failCount}</li>
            </ul>

            <p><strong>💰 Revenue by Provider:</strong></p>
            <ul>
              {Object.entries(report.revenueByProvider).map(([provider, amount], i) => (
                <li key={i}>
                  {provider}: AED {amount.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
