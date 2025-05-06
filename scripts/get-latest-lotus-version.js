const https = require('https');

async function getLatestLotusVersion() {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.github.com',
            path: '/repos/filecoin-project/lotus/releases/latest',
            headers: {
                'User-Agent': 'Node.js'
            }
        };

        https.get(options, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                try {
                    const releaseInfo = JSON.parse(data);
                    const tagName = releaseInfo.tag_name;

                    if (!tagName || !tagName.startsWith('v') || tagName.includes('miner')) {
                        throw new Error('Could not find a valid tag in the release info');
                    }

                    // Remove 'v' prefix
                    const version = tagName.substring(1);
                    resolve(version);
                } catch (error) {
                    reject(new Error(`Failed to parse release info: ${error.message}`));
                }
            });
        }).on('error', (error) => {
            reject(new Error(`Failed to fetch release info: ${error.message}`));
        });
    });
}

if (require.main === module) {
    getLatestLotusVersion()
        .then(version => console.log(version))
        .catch(error => {
            console.error(error.message);
            process.exit(1);
        });
}

module.exports = getLatestLotusVersion; 