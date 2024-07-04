const { execSync } = require('child_process');
// get root folder of global node modules
const npmRoot = execSync('npm root -g').toString().trim();

require(`${npmRoot}/dotenv`).config();

module.exports = {
  apps: [
    {
      name: 'kuaihuoer-beta',
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
