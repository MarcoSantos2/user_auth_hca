const concurrently = require('concurrently');
const path = require('path');

concurrently(
  [
    { command: 'sudo service mysql start', name: 'MySql', prefix: 'MySql', prefixColor: 'blue' },
    { command: 'npm run dev', name: 'Backend', cwd: path.resolve(__dirname, 'backend'), prefix: 'Backend', prefixColor: 'red' },
    { command: 'npm run dev', name: 'Web Front-End', cwd: path.resolve(__dirname, 'web-front-end'), prefix: 'Web Front-End', prefixColor: 'yellow' },
  ],
  {
    killOthers: ['failure'],
  },
);
