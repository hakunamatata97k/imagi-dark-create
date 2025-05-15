
// Start script for frontend and backend
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

// Get the directory name equivalent to __dirname in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  const backendProcess = exec('npm run start:backend', { cwd: __dirname });
  
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
