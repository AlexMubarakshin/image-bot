const CloudmersiveImageApiClient = require('cloudmersive-image-api-client');
const fs = require('fs');

module.exports = class Cloudmersive {
    constructor(apiKey) {
        var defaultClient = CloudmersiveImageApiClient.ApiClient.instance;

        // Configure API key authorization: Apikey
        var ApiKey = defaultClient.authentications['Apikey'];
        ApiKey.apiKey = apiKey;

        this._apiInstance = new CloudmersiveImageApiClient.RecognizeApi();
    }

    recognizeImage(imageLocalPath) {
        return new Promise(async (resolve, reject) => {
            const imageFile = Buffer.from(fs.readFileSync(imageLocalPath).buffer); // File | Image file to perform the operation on.  Common file formats such as PNG, JPEG are supported.

            this._apiInstance.recognizeDetectObjects(imageFile, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            });
        });
    }
};