export interface ScanResult {
  ip: string;
  port: number;
  status: 'open' | 'closed';
  service?: string;
}

export interface ScanRequest {
  ip: string;
  portRange: {
    start: number;
    end: number;
  };
}