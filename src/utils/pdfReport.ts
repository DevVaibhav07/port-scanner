import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ScanResult } from '../types/scan';
import { portInfo } from './portInfo';

export const generatePDFReport = (results: ScanResult[]): void => {
  const doc = new jsPDF();
  const timestamp = new Date().toLocaleString();
  const openPorts = results.filter(r => r.status === 'open');
  
  // Add title
  doc.setFontSize(20);
  doc.text('Port Scan Report', 14, 20);
  
  // Add metadata
  doc.setFontSize(11);
  doc.text(`Generated: ${timestamp}`, 14, 30);
  doc.text(`Total Ports Scanned: ${results.length}`, 14, 37);
  doc.text(`Open Ports Found: ${openPorts.length}`, 14, 44);
  
  // Create table data for open ports
  const tableData = openPorts.map(port => {
    const info = portInfo[port.port];
    return [
      port.port.toString(),
      port.service || 'Unknown',
      info?.security || 'N/A',
      info?.commonUse || 'N/A'
    ];
  });

  // Add open ports table
  let finalY: number;
  autoTable(doc, {
    startY: 55,
    head: [['Port', 'Service', 'Security', 'Common Use']],
    body: tableData,
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontSize: 12
    },
    bodyStyles: {
      fontSize: 10
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    margin: { top: 50 },
    didDrawPage: (data) => {
      finalY = data.cursor?.y ?? 55;
    }
  });

  // Add port details
  let yPos = (doc as any).lastAutoTable.finalY + 20;

  openPorts.forEach(port => {
    const info = portInfo[port.port];
    if (info) {
      if (yPos > 270) { // Check if we need a new page
        doc.addPage();
        yPos = 20;
      }

      doc.setFontSize(14);
      doc.text(`Port ${port.port} (${info.name})`, 14, yPos);
      
      doc.setFontSize(10);
      doc.text(`Description: ${info.description}`, 14, yPos + 7);
      doc.text(`Security Considerations: ${info.security}`, 14, yPos + 14);
      doc.text(`Common Usage: ${info.commonUse}`, 14, yPos + 21);
      
      yPos += 35;
    }
  });

  // Save the PDF
  doc.save(`port-scan-report-${new Date().toISOString()}.pdf`);
}; 