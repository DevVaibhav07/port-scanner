import express from 'express';
import cors from 'cors';
import { scanPorts } from './scanner.js';
import { setupLogger } from './logger.js';
import { validateScanRequest } from './middleware/validation.js';

const app = express();
const logger = setupLogger();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).send('OK');
});

app.post('/api/scan', validateScanRequest, async (req, res) => {
  try {
    const { ip, portRange } = req.body;
    logger.info(`Starting scan for IP: ${ip}, Ports: ${portRange.start}-${portRange.end}`);
    
    const results = await scanPorts(ip, portRange.start, portRange.end);
    
    logger.info(`Scan completed for IP: ${ip}`);
    res.json(results);
  } catch (error) {
    logger.error('Scan error:', error);
    res.status(500).json({ error: 'Scan failed' });
  }
});

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});