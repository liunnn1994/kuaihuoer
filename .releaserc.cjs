/**
 * @type {import('semantic-release').GlobalConfig}
 */
const branch = process.env.CI_COMMIT_BRANCH;
const commitSha = process.env.CI_COMMIT_SHORT_SHA;
const stableBranch = 'stable';
const changelogFile = `./CHANGELOG${branch === stableBranch ? '' : '-' + branch}.md`;
const pkgJson = require('./package.json');
const statsUrl = `https://${pkgJson.name}_${commitSha}.surge.sh`;

const config = {
  branches: [
    stableBranch,
    {
      name: 'development',
      prerelease: true,
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        changelogFile,
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    [
      '@semantic-release/exec',
      {
        prepareCmd:
          'scripts/deploy.js --branch ${branch.name} --version ${nextRelease.version} --prepare true',
        successCmd:
          'scripts/deploy.js --branch ${branch.name} --version ${nextRelease.version} --success true --commitSha ' +
          commitSha,
      },
    ],
    [
      '@semantic-release/git',
      {
        message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        assets: ['package.json', changelogFile],
      },
    ],
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'output.zip', label: 'v${nextRelease.version}' },
          {
            url: statsUrl,
            label: '打包分析',
          },
        ],
      },
    ],
  ],
};

module.exports = config;
