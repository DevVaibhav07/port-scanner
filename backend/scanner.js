import net from 'net';
import { getCommonServices } from './services.js';
import { setupLogger } from './logger.js';

const logger = setupLogger();
const TIMEOUT = 1000;

export const scanPort = (ip, port) => {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let status = 'closed';
    
    socket.setTimeout(TIMEOUT);

    socket.on('connect', () => {
      status = 'open';
      socket.destroy();
    });

    socket.on('timeout', () => {
      socket.destroy();
    });

    socket.on('error', () => {
      socket.destroy();
    });

    socket.on('close', () => {
      resolve({
        ip,
        port,
        status,
        service: status === 'open' ? getCommonServices()[port] : undefined
      });
    });

    socket.connect(port, ip);
  });
};

export const scanPorts = async (ip, startPort, endPort) => {
  const ports = Array.from(
    { length: endPort - startPort + 1 },
    (_, i) => startPort + i
  );
  
  logger.info(`Scanning ports ${startPort}-${endPort} on ${ip}`);
  
  const results = await Promise.all(
    ports.map(port => scanPort(ip, port))
  );
  
  return results;
};