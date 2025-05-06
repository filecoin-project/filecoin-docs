const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const access = promisify(fs.access);

/**
 * Updates version references in documentation files
 * @param {string} newVersion - The new version to update to
 */
async function updateVersions(newVersion) {
    if (!newVersion) {
        throw new Error('Version number is required');
    }

    // Validate version format (e.g., 1.32.3)
    if (!/^\d+\.\d+\.\d+$/.test(newVersion)) {
        throw new Error('Invalid version format. Expected format: x.y.z');
    }

    try {
        // Read the current version from package.json
        const packageJson = JSON.parse(await readFile('package.json', 'utf8'));
        const currentVersion = packageJson.version;

        console.log(`Updating version references from ${currentVersion} to ${newVersion}`);

        // Update package.json
        packageJson.version = newVersion;
        await writeFile('package.json', JSON.stringify(packageJson, null, 2) + '\n');
        console.log('Updated version in package.json');

        // Update version in documentation files
        const docsDir = path.join(__dirname, '..', 'docs');
        
        try {
            // Check if docs directory exists
            await access(docsDir, fs.constants.F_OK);
            
            const files = await findFiles(docsDir, ['.md', '.mdx']);
            console.log(`Found ${files.length} documentation files to process`);

            for (const file of files) {
                const content = await readFile(file, 'utf8');
                const updatedContent = content.replace(
                    new RegExp(`v${currentVersion}`, 'g'),
                    `v${newVersion}`
                );

                if (content !== updatedContent) {
                    await writeFile(file, updatedContent);
                    console.log(`Updated version in ${file}`);
                }
            }
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log('No docs directory found, skipping documentation updates');
            } else {
                throw error;
            }
        }

        console.log('Version update completed successfully');
    } catch (error) {
        console.error('Error updating versions:', error.message);
        process.exit(1);
    }
}

/**
 * Recursively finds files with specific extensions in a directory
 * @param {string} dir - Directory to search in
 * @param {string[]} extensions - Array of file extensions to match
 * @returns {Promise<string[]>} Array of file paths
 */
async function findFiles(dir, extensions) {
    const files = [];
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            files.push(...await findFiles(fullPath, extensions));
        } else if (entry.isFile() && extensions.some(ext => entry.name.endsWith(ext))) {
            files.push(fullPath);
        }
    }

    return files;
}

// If this file is run directly (not imported)
if (require.main === module) {
    const newVersion = process.argv[2];
    updateVersions(newVersion).catch(error => {
        console.error(error.message);
        process.exit(1);
    });
}

module.exports = updateVersions; 