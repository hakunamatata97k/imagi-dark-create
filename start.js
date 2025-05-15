
const { exec } = require('child_process');
const path = require('path');

// Determine which part to start
const arg = process.argv[2] || 'all';

// Frontend startup
function startFrontend() {
  console.log('Starting frontend...');
  const frontendProcess = exec('npx vite', { cwd: __dirname });
  
  frontendProcess.stdout.on('data', (data) => {
    console.log(`Frontend: ${data}`);
  });
  
  frontendProcess.stderr.on('data', (data) => {
    console.error(`Frontend Error: ${data}`);
  });
  
  return frontendProcess;
}

// Backend startup
function startBackend() {
  console.log('Starting backend...');
  const backendProcess = exec('node server/index.js', { cwd: __dirname });
  
  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`);
  });
  
  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend Error: ${data}`);
  });
  
  return backendProcess;
}

// Start the selected parts
if (arg === 'frontend' || arg === 'all') {
  const frontend = startFrontend();
  process.on('SIGINT', () => {
    frontend.kill();
    if (arg === 'frontend') process.exit(0);
  });
}

if (arg === 'backend' || arg === 'all') {
  const backend = startBackend();
  process.on('SIGINT', () => {
    backend.kill();
    if (arg === 'backend') process.exit(0);
  });
}

console.log('Press Ctrl+C to stop all processes');
