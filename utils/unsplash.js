const UnsplashAPI = require('unsplash-js').default;
const { toJson } = require('unsplash-js');
require('isomorphic-fetch');

const imageUtils = require('./image');

module.exports = class Unsplash {

    constructor(appID, appSecret, callbackUrl) {
        this.unsplash = new UnsplashAPI({
            applicationId: appID,
            secret: appSecret,
            callbackUrl: callbackUrl,
            headers: {
                'X-Custom-Header': 'foo'
            }
        });
    }

    getRandomPhoto() {
        return new Promise((resolve) => {
            // this.unsplash.photos.getRandomPhoto.proto
            const unspashOpts = { cacheBuster: Math.random() * 100, featured: true };
            this.unsplash.photos.getRandomPhoto(unspashOpts)
                .then(toJson)
                .then(async (json) => {
                    const savePath = './images/' + json.id + '.jpg';
                    try {
                        await imageUtils.downloadPhoto(json.urls.regular, savePath);
                    } catch (error) {
                        throw error;
                    }

                    resolve({ id: json.id, url: json.urls.regular, savedPath: savePath });
                });

        });
    }
};