export const portInfo: Record<number, {
  name: string;
  description: string;
  security: string;
  commonUse: string;
}> = {
  20: {
    name: 'FTP-DATA',
    description: 'File Transfer Protocol (Data Channel)',
    security: 'Unencrypted data transfer, vulnerable to sniffing attacks',
    commonUse: 'Used for transferring files between client and server'
  },
  21: {
    name: 'FTP',
    description: 'File Transfer Protocol (Control Channel)',
    security: 'Plain text authentication, consider using SFTP instead',
    commonUse: 'Command and control channel for FTP file transfers'
  },
  22: {
    name: 'SSH',
    description: 'Secure Shell',
    security: 'Encrypted communication, highly secure when properly configured',
    commonUse: 'Remote server administration and secure file transfers'
  },
  23: {
    name: 'Telnet',
    description: 'Telnet Protocol',
    security: 'Unencrypted, highly vulnerable to attacks',
    commonUse: 'Legacy remote administration (not recommended)'
  },
  25: {
    name: 'SMTP',
    description: 'Simple Mail Transfer Protocol',
    security: 'Basic email transfer, should be secured with TLS',
    commonUse: 'Email server communication'
  },
  53: {
    name: 'DNS',
    description: 'Domain Name System',
    security: 'Vulnerable to DNS spoofing if not secured',
    commonUse: 'Domain name resolution'
  },
  80: {
    name: 'HTTP',
    description: 'Hypertext Transfer Protocol',
    security: 'Unencrypted web traffic, vulnerable to MITM attacks',
    commonUse: 'Web servers and internet browsing'
  },
  110: {
    name: 'POP3',
    description: 'Post Office Protocol v3',
    security: 'Basic email retrieval, should use encrypted version',
    commonUse: 'Email retrieval from server'
  },
  143: {
    name: 'IMAP',
    description: 'Internet Message Access Protocol',
    security: 'Email management, should use encrypted version',
    commonUse: 'Email management and retrieval'
  },
  443: {
    name: 'HTTPS',
    description: 'HTTP Secure',
    security: 'Encrypted web traffic using TLS/SSL',
    commonUse: 'Secure web servers and encrypted internet browsing'
  },
  445: {
    name: 'SMB',
    description: 'Server Message Block',
    security: 'File sharing, should be properly configured to prevent attacks',
    commonUse: 'Windows file and printer sharing'
  },
  1433: {
    name: 'MSSQL',
    description: 'Microsoft SQL Server',
    security: 'Database access, should be restricted and encrypted',
    commonUse: 'Microsoft SQL Server database connections'
  },
  3306: {
    name: 'MySQL',
    description: 'MySQL Database Server',
    security: 'Should be restricted to trusted IPs only',
    commonUse: 'Database connections for MySQL/MariaDB'
  },
  5432: {
    name: 'PostgreSQL',
    description: 'PostgreSQL Database',
    security: 'Should be restricted and use SSL connections',
    commonUse: 'PostgreSQL database connections'
  },
  6379: {
    name: 'Redis',
    description: 'Redis Database',
    security: 'Should never be exposed to public internet',
    commonUse: 'In-memory data structure store'
  },
  8080: {
    name: 'HTTP Alternate',
    description: 'Alternative HTTP Port',
    security: 'Same concerns as port 80',
    commonUse: 'Alternative web server port, often used for development'
  },
  27017: {
    name: 'MongoDB',
    description: 'MongoDB Database',
    security: 'Should be properly authenticated and encrypted',
    commonUse: 'MongoDB database connections'
  }
}; 