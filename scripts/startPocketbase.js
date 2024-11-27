import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { execSync } from 'child_process';
import fs from 'fs';

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pbPath = join(__dirname, '..', 'pocketbase');

// Create pocketbase directory if it doesn't exist
if (!fs.existsSync(pbPath)) {
  fs.mkdirSync(pbPath);
}

// Download PocketBase if not already present
const pbExecutable = process.platform === 'win32' ? 'pocketbase.exe' : 'pocketbase';
const pbExecutablePath = join(pbPath, pbExecutable);

if (!fs.existsSync(pbExecutablePath)) {
  console.log('Downloading PocketBase...');
  
  const platform = process.platform === 'win32' ? 'windows' : process.platform === 'darwin' ? 'darwin' : 'linux';
  const arch = process.arch === 'x64' ? 'amd64' : 'arm64';
  
  const downloadUrl = `https://github.com/pocketbase/pocketbase/releases/download/v0.20.0/pocketbase_0.20.0_${platform}_${arch}.zip`;
  
  try {
    // Download and extract PocketBase
    execSync(`curl -L ${downloadUrl} -o pb.zip`, { cwd: pbPath });
    execSync(`unzip pb.zip`, { cwd: pbPath });
    execSync(`rm pb.zip`, { cwd: pbPath });
    execSync(`chmod +x ${pbExecutablePath}`);
    
    console.log('PocketBase downloaded successfully!');
  } catch (error) {
    console.error('Error downloading PocketBase:', error);
    process.exit(1);
  }
}

// Start PocketBase
console.log('Starting PocketBase server...');
try {
  execSync(`${pbExecutablePath} serve`, { cwd: pbPath, stdio: 'inherit' });
} catch (error) {
  console.error('Error starting PocketBase:', error);
  process.exit(1);
}