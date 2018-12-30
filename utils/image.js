const fs = require('fs');

require('isomorphic-fetch');

module.exports = {

    downloadPhoto: (url, savePath) => {
        return fetch(url)
            .then((response) => {

                return new Promise((resolve, reject) => {
                    const fileStream = fs.createWriteStream(savePath, { flags: 'w' });

                    response.body.pipe(fileStream);

                    response.body.on('error', (err) => {
                        reject(err);
                    });

                    fileStream.on('finish', () => {
                        resolve();
                    });
                });
            });
    }
};