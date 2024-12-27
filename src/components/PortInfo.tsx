import React, { useState } from 'react';
import { portInfo } from '../utils/portInfo';

interface Props {
  port: number;
  service: string | undefined;
}

export const PortInfo: React.FC<Props> = ({ port, service }) => {
  const [isOpen, setIsOpen] = useState(false);
  const info = portInfo[port];

  if (!info) return null;

  return (
    <div className="mt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
      >
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-90' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        More Information
      </button>

      {isOpen && (
        <div className="mt-2 p-4 bg-[var(--primary-bg)] rounded-lg text-sm space-y-2">
          <p><span className="font-semibold">Description:</span> {info.description}</p>
          <p><span className="font-semibold">Security:</span> {info.security}</p>
          <p><span className="font-semibold">Common Use:</span> {info.commonUse}</p>
        </div>
      )}
    </div>
  );
}; 