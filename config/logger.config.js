require('dotenv/config');
const { createLogger, format, transports } = require('winston');

const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const TRANSPORTS = [];

if (process.env.ENV == 'prod') {
    TRANSPORTS.push(        
        new transports.File({
            level: 'silly',
            filename: 'combined.log',
            maxsize: 4096,
            maxFiles: 4,
            json: true,
            handleExceptions: true,
            colorize: false,
            timestamp: true
        })
    );
} else {
    TRANSPORTS.push(
        new transports.Console({
            level: 'silly',
            handleExceptions: true,
            json: true,
            colorize: true,
            timestamp: true
        })
    );
}

const logger = createLogger({
    transports: TRANSPORTS,
    exitOnError: false,
    format: combine(
        label({ label: 'JWT' }),
        format.colorize(),
        timestamp(),
        myFormat
    )
});

module.exports = logger;