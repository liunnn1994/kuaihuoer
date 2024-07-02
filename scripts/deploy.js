#!/usr/bin/env zx

const { SURGE_TOKEN } = process.env;
const { branch, version, prepare, success, commitSha } = argv;

const { name: pkgName } = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

await main();

async function main() {
  if (prepare) {
    await buildAndArchive();
    await deploy();
  } else if (success) {
    await deployStats();
  }
}

async function deploy() {
  switch (branch) {
    case 'canary':
      await deployCanary();
      break;
    case 'beta':
      await deployBeta();
      break;
    case 'stable':
      await deployStable();
      break;
    default:
      console.warn(`分支 ${branch} 未部署`);
  }
}

async function buildAndArchive() {
  console.log(new Date().toLocaleString(), `${pkgName} v${version} 打包中...`);
  await $`pnpm run build:${branch}-archive`.pipe(process.stdout);
  console.log(new Date().toLocaleString(), `${pkgName} v${version} 打包完成`);
}

async function deployCanary() {
  console.log(new Date().toLocaleString(), `${pkgName} v${version} 部署中...`);
}

async function deployBeta() {
  console.log(new Date().toLocaleString(), `${pkgName} v${version} 部署中...`);
}

async function deployStable() {
  console.log(new Date().toLocaleString(), `${pkgName} v${version} 部署中...`);
}

async function deployStats() {
  const surgeDomain = `${pkgName}_${commitSha}.surge.sh`;
  console.log(
    new Date().toLocaleString(),
    `${pkgName} v${version} 正在将统计数据部署到 ${surgeDomain}...`,
  );
  await $`surge ./stats ${surgeDomain} --token ${SURGE_TOKEN}`;
}

/**
 * rfc3339 时间格式化
 * @param {Date} d Date
 * @returns {string} rfc3339 时间格式
 */
function rfc3339(d = new Date()) {
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  function timezoneOffset(offset) {
    let sign;
    if (offset === 0) {
      return 'Z';
    }
    sign = offset > 0 ? '-' : '+';
    offset = Math.abs(offset);
    return sign + pad(Math.floor(offset / 60)) + ':' + pad(offset % 60);
  }

  return (
    d.getFullYear() +
    '-' +
    pad(d.getMonth() + 1) +
    '-' +
    pad(d.getDate()) +
    'T' +
    pad(d.getHours()) +
    ':' +
    pad(d.getMinutes()) +
    ':' +
    pad(d.getSeconds()) +
    timezoneOffset(d.getTimezoneOffset())
  );
}
