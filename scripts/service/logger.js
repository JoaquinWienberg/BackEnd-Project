import winston from "winston"

// silly 6
// debug 5
// verbose 4
// info 3
// warn 2
// error 1

// WINSTON

function buildProdLogger() {
    const prodLogger = winston.createLogger({
        transports: [,
            new winston.transports.File({ filename: 'warn.log', level: 'warning' }),
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
        ]
    });
    return prodLogger;
}

function buildDevLogger() {
    const devLogger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: 'warn.log', level: 'warning' }),
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.Console({ level: 'info' }),
            new winston.transports.Console({ level: 'warning' }),
            new winston.transports.Console({ level: 'error' })
        ]
    });
    return devLogger;
}

const logger = (process.env.NODE_ENV === 'PROD') ?
    buildProdLogger() : buildDevLogger();

export default logger