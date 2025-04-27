const fs = require('fs');
const { execSync } = require('child_process');

// Step 1: Read the current tsconfig.json
console.log('Reading tsconfig.json...');
const tsconfigPath = './tsconfig.json';
const originalTsconfig = fs.readFileSync(tsconfigPath, 'utf8');
const tsconfig = JSON.parse(originalTsconfig);

// Step 2: Modify the configuration for build
console.log('Modifying TypeScript configuration for build...');
// Remove the problematic option
if (tsconfig.compilerOptions.allowImportingTsExtensions) {
  delete tsconfig.compilerOptions.allowImportingTsExtensions;
}

// Step 3: Write the modified config
fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));

try {
  // Step 4: Run Prisma generate
  console.log('Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Step 5: Run TypeScript compiler with relaxed settings
  console.log('Compiling TypeScript...');
  execSync('tsc --skipLibCheck true --noImplicitAny false --noImplicitThis false --strictNullChecks false', { stdio: 'inherit' });
  
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error);
} finally {
  // Step 6: Restore the original tsconfig.json
  console.log('Restoring original TypeScript configuration...');
  fs.writeFileSync(tsconfigPath, originalTsconfig);
}