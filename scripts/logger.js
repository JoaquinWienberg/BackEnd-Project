import winston from "winston"

// silly 6
// debug 5
// verbose 4
// info 3
// warn 2
// error 1

// WINSTON

function buildDevLogger() {
    const devLogger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.Console({ level: 'info' }),
        ]
    });
    return devLogger;
}

const logger = buildDevLogger();

export default logger