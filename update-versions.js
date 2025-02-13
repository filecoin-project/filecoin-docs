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
    let versionToUpdate = null;

    // First pass: find the lotus-x.xx.x version
    files.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            const lotusVersionMatch = content.match(/lotus-(\d+\.\d+\.\d+)/);
            
            if (lotusVersionMatch) {
                versionToUpdate = lotusVersionMatch[1];
                console.log(`Found lotus version to update: ${versionToUpdate}`);
                return false; // Exit the forEach loop once we find a version
            }
        } catch (error) {
            console.error(`Error reading ${file}:`, error);
        }
    });

    if (!versionToUpdate) {
        console.error('No lotus version found in files');
        return;
    }

    // Second pass: update all occurrences of the version
    files.forEach(file => {
        try {
            const content = fs.readFileSync(file, 'utf8');
            let processed = content;

            // Create regex to match the version with optional lotus- prefix
            const versionRegex = new RegExp(`(lotus-)?${versionToUpdate.replace(/\./g, '\\.')}`, 'g');
            
            const matches = content.match(versionRegex);
            if (matches) {
                matches.forEach(match => {
                    // If match includes 'lotus-', replace with 'lotus-NEW_VERSION'
                    // Otherwise just replace with NEW_VERSION
                    const replacement = match.includes('lotus-') ? 
                        `lotus-${NEW_VERSION}` : 
                        NEW_VERSION;
                    
                    processed = processed.replace(match, replacement);
                });

                if (content !== processed) {
                    fs.writeFileSync(file, processed);
                    console.log(`Updated in ${file}:`);
                    console.log(`Found patterns: ${matches.join(', ')}`);
                    console.log(`Updated to versions containing: ${NEW_VERSION}`);
                }
            }
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    });
}

processFiles();