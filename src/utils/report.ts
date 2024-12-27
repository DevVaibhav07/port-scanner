import { ScanResult } from '../types/scan';

export const generateReport = (results: ScanResult[]): string => {
  const timestamp = new Date().toISOString();
  const openPorts = results.filter(r => r.status === 'open');
  
  let report = `Port Scan Report
Generated: ${timestamp}
Total Ports Scanned: ${results.length}
Open Ports Found: ${openPorts.length}

=== Open Ports ===\n`;

  openPorts.forEach(result => {
    report += `Port ${result.port}: ${result.service || 'Unknown Service'}\n`;
  });

  return report;
};