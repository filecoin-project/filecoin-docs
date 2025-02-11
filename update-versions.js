const fs = require('fs');
const path = require('path');

// Get the new version from command line argument
const NEW_VERSION = process.argv[2];

if (!NEW_VERSION) {
    console.error('Please provide the new version number as an argument.');
    console.error('Usage: node script.js <new_version>');
    console.error('Example: node script.js 1.31.2');
    process.exit(1);
}

const getAllFiles = (dirPath, arrayOfFiles = []) => {
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (file !== 'preview') {
                getAllFiles(fullPath, arrayOfFiles);
            }
        } else if (path.extname(file) === '.md') {
            arrayOfFiles.push(fullPath);
        }
    });

    return arrayOfFiles;
};

function processFiles() {
    const files = getAllFiles('.');
    // Regex patterns for both actual versions and X.X.X pattern
    const versionRegex = /lotus-(\d+\.\d+\.\d+|X\.X\.X)/g;

    files.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            let processed = content;
            
            // Find all version patterns in the file
            const matches = content.match(versionRegex);
            if (matches) {
                matches.forEach(oldVersionString => {
                    const newVersionString = `lotus-${NEW_VERSION}`;
                    processed = processed.replace(oldVersionString, newVersionString);
                });
                
                if (content !== processed) {
                    fs.writeFileSync(file, processed);
                    console.log(`Updated versions in: ${file}`);
                    console.log(`Found patterns: ${matches.join(', ')}`);
                    console.log(`Updated to: lotus-${NEW_VERSION}`);
                }
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    });
}

processFiles();