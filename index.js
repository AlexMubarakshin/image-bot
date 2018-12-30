const express = require('express');
const server = express();
const morgan = require('morgan');

const cron = require('node-cron');

require('dotenv').config();

const PORT = process.env.SERVER_DEFAULT_PORT || 3000;

const winston = require('./utils/logger');
const Unsplash = require('./utils/unsplash');
const Cloudmersive = require('./utils/cloudmersive');

let unsplashInstance;
let cloudmersiveInstance;


// Running a task every two minutes
cron.schedule('*/2 * * * *', async () => {
    try {
        winston.info('Starting download new photo');
        const randPhoto = await unsplashInstance.getRandomPhoto();
        const photoDescription = await cloudmersiveInstance.recognizeImage(randPhoto.savedPath);
        winston.info(`Photo has been downloaded ${randPhoto.id}`);
        winston.info(`Photo description ${photoDescription}`);
    } catch (error) {
        winston.error(error);
    }
});


//#region Express
server.use(morgan('combined', { stream: winston.stream }));

server.get('/', function (req, res) {
    res.send('Hello World');
});

server.listen(PORT, async () => {
    unsplashInstance = new Unsplash(process.env.UNSPLASH_ACCESS_KEY, process.env.UNSPLASH_SECRET_KEY, process.env.UNSPLASH_CALLBACK_URL);
    cloudmersiveInstance = new Cloudmersive(process.env. cloudmersive_api_key);

    winston.info(`Listen on ${PORT}`);
});
//#endregion Express