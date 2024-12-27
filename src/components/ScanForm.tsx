import React, { useState } from 'react';
import { ScanRequest } from '../types/scan';

interface Props {
  onScan: (data: ScanRequest) => void;
  isScanning: boolean;
}

export const ScanForm: React.FC<Props> = ({ onScan, isScanning }) => {
  const [ip, setIp] = useState('');
  const [startPort, setStartPort] = useState('1');
  const [endPort, setEndPort] = useState('1024');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScan({
      ip,
      portRange: {
        start: parseInt(startPort),
        end: parseInt(endPort)
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="scan-form">
      <div className="flex gap-4">
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          placeholder="Enter IP address (e.g., 192.168.1.1)"
          className="input-field flex-grow"
          required
        />
        <input
          type="number"
          value={startPort}
          onChange={(e) => setStartPort(e.target.value)}
          placeholder="Start Port"
          className="input-field w-24"
          required
        />
        <input
          type="number"
          value={endPort}
          onChange={(e) => setEndPort(e.target.value)}
          placeholder="End Port"
          className="input-field w-24"
          required
        />
        <button
          type="submit"
          disabled={isScanning}
          className="button-primary"
        >
          {isScanning ? 'Scanning...' : 'Scan'}
        </button>
      </div>
    </form>
  );
};