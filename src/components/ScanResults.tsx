import React from 'react';
import { ScanResult } from '../types/scan';
import { PortInfo } from './PortInfo';

interface Props {
  results: ScanResult[];
  onExport: () => void;
}

export const ScanResults: React.FC<Props> = ({ results }) => {
  if (results.length === 0) return null;

  // Separate and sort results- This is developed by  @vaibhavkubade
  const openPorts = results
    .filter(result => result.status === 'open')
    .sort((a, b) => a.port - b.port);

  const closedPorts = results
    .filter(result => result.status === 'closed')
    .sort((a, b) => a.port - b.port);

  return (
    <div className="space-y-8">
      {/* Open Ports Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2">
          Open Ports ({openPorts.length})
        </h3>
        {openPorts.map((result, index) => (
          <div
            key={`open-${index}`}
            className="p-4 rounded-lg bg-[var(--secondary-bg)] border border-green-900/30"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="text-lg">Port {result.port}</span>
                <span className="px-2 py-1 rounded-full text-xs bg-green-900/50 text-green-400">
                  {result.status}
                </span>
              </div>
              {result.service && (
                <span className="text-[var(--text-secondary)]">
                  {result.service}
                </span>
              )}
            </div>
            <PortInfo port={result.port} service={result.service} />
          </div>
        ))}
      </div>

      {/* Closed Ports Section */}
      {closedPorts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-[var(--text-primary)] border-b border-[var(--border-color)] pb-2">
            Closed Ports ({closedPorts.length})
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {closedPorts.map((result, index) => (
              <div
                key={`closed-${index}`}
                className="p-3 rounded-lg bg-[var(--secondary-bg)] opacity-60"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm">Port {result.port}</span>
                  <span className="px-2 py-1 rounded-full text-xs bg-red-900/50 text-red-400">
                    closed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};