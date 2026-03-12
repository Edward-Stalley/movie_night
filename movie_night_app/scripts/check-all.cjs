/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require('child_process');

function runCommand(cmd, label) {
  try {
    execSync(cmd, { stdio: 'ignore' }); // hide all stdio
    console.log(`✅ ${label} passed!`);
  } catch {
    if (label.includes('Prettier')) {
      console.log(`⚠️ ${label} found issues. Run "npm run format" to fix.`);
    } else {
      console.log(`❌ ${label} failed!`);
      process.exit(1);
    }
  }
}

console.log('Running all checks...');

runCommand('npm run types', 'TypeScript type check');
runCommand('npm run lint', 'ESLint linting');
runCommand('npm run format:check', 'Prettier formatting check');

console.log('All checks finished!');
