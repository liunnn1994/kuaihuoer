require('dotenv').config();

module.exports = {
  apps: [
    {
      name: 'kuaihuoer-canary',
      cwd: './server',
      script: 'index.mjs',
      instances: 4,
      exec_mode: 'cluster',
      env: {
        HOST: '0.0.0.0',
        PORT: '80',
        ...process.env,
      },
    },
  ],
};
