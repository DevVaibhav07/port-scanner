import React, { useState, useEffect } from 'react';
import { ScanForm } from './components/ScanForm';
import { ScanResults } from './components/ScanResults';
import { ScanRequest, ScanResult } from './types/scan';
import { generateReport } from './utils/report';
import { scanPorts, checkServerConnection } from './services/api';
import { generatePDFReport } from './utils/pdfReport';

function App() {
  const [results, setResults] = useState<ScanResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [serverConnected, setServerConnected] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      const isConnected = await checkServerConnection();
      setServerConnected(isConnected);
      setChecking(false);
    };
    checkConnection();
  }, []);

  const handleScan = async (scanRequest: ScanRequest) => {
    setIsScanning(true);
    try {
      const data = await scanPorts(scanRequest);
      setResults(data);
    } catch (error) {
      console.error('Scan failed:', error);
      alert('Scan failed. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleExport = () => {
    const report = generateReport(results);
    const blob = new Blob([report], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `port-scan-report-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-[var(--primary-bg)] flex items-center justify-center">
        <p className="text-[var(--text-primary)]">Checking server connection...</p>
      </div>
    );
  }

  if (!serverConnected) {
    return (
      <div className="min-h-screen bg-[var(--primary-bg)] flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-[var(--text-primary)]">Backend server is not running.</p>
          <p className="text-[var(--text-secondary)]">Please start the backend server using:</p>
          <code className="block bg-[var(--secondary-bg)] p-4 rounded">npm run dev:backend</code>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--primary-bg)]">
      <nav className="border-b border-[var(--border-color)] p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-[var(--text-primary)]">Vaibhav's Port Scanner</h1>
          {results.length > 0 && (
            <button
              onClick={handleExport}
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Export Results
            </button>
          )}
        </div>
      </nav>

      <div className="chat-like-container">
        <div className="result-container">
          <ScanResults results={results} onExport={handleExport} />
        </div>
        
        <div className="input-container">
          <ScanForm onScan={handleScan} isScanning={isScanning} />
        </div>
      </div>
    </div>
  );
}

export default App;