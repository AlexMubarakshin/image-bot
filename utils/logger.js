const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const loggerConfig =  {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
    file: {
        level: 'info',
        filename: './logs/app.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false
    }
};


const logger = winston.createLogger({
    format: combine(
        label({ label: process.env.APPLICATION_NAME || 'log' }),
        timestamp(),
        myFormat
    ),
    transports: [
        new winston.transports.Console(loggerConfig.console),
        new winston.transports.File(loggerConfig.file)
    ],
    exitOnError: false
});

logger.stream = {
    write: function (message) {
        logger.info(message);
    },
};

module.exports = logger;