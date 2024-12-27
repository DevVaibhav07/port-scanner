export const validateScanRequest = (req, res, next) => {
  const { ip, portRange } = req.body;

  if (!ip || !portRange) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const { start, end } = portRange;

  if (!start || !end || start > end || start < 1 || end > 65535) {
    return res.status(400).json({ error: 'Invalid port range' });
  }

  // Basic IP validation
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(ip)) {
    return res.status(400).json({ error: 'Invalid IP address format' });
  }

  next();
};