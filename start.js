
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

// Get the directory name equivalent to __dirname in CommonJS
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determine which part to start
const arg = process.argv[2] || 'all';

// Compile TypeScript for backend
function compileTypeScript() {
  console.log('Compiling TypeScript files...');
  
  // Create dist directory if it doesn't exist
  if (!fs.existsSync(path.join(__dirname, 'server', 'dist'))) {
    fs.mkdirSync(path.join(__dirname, 'server', 'dist'), { recursive: true });
  }
  
  return new Promise((resolve, reject) => {
    const tscProcess = exec('npx tsc --project server/tsconfig.json', { cwd: __dirname });
    
    tscProcess.stdout.on('data', (data) => {
      console.log(`TypeScript compiler: ${data}`);
    });
    
    tscProcess.stderr.on('data', (data) => {
      console.error(`TypeScript compiler error: ${data}`);
    });
    
    tscProcess.on('close', (code) => {
      if (code === 0) {
        console.log('TypeScript compilation successful');
        resolve();
      } else {
        console.error(`TypeScript compilation failed with code ${code}`);
        reject(new Error(`TypeScript compilation failed with code ${code}`));
      }
    });
  });
}

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
  const backendProcess = exec('node server/dist/index.js', { cwd: __dirname });
  
  backendProcess.stdout.on('data', (data) => {
    console.log(`Backend: ${data}`);
  });
  
  backendProcess.stderr.on('data', (data) => {
    console.error(`Backend Error: ${data}`);
  });
  
  return backendProcess;
}

// Start the selected parts
async function start() {
  try {
    if (arg === 'backend' || arg === 'all') {
      await compileTypeScript();
    }
    
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
  } catch (error) {
    console.error('Error starting the application:', error);
    process.exit(1);
  }
}

start();
