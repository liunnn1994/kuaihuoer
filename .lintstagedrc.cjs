module.exports = {
  '**/*': ['pnpm format'],
  '**/*.{vue,js,jsx,cjs,mjs,ts,tsx,cts,mts}': ['pnpm lint:oxlint', 'pnpm lint:eslint'],
};
