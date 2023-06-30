/* eslint-disable */
const winston = require('winston');

export default () => {
    const defaultMessageFormat = winston.format.printf(msg => {
        const { level, timestamp, message, stack } = msg;
        let log = typeof message === 'object' ?
            JSON.stringify(msg.message) :
            message || msg[Symbol.for('message')];

        if (msg.origin && msg.originOrderId) {
            log += ` ${msg.origin} - ${msg.originOrderId}`;
        }

        if (stack) {
            log = stack;
        }

        return `${timestamp} / ${level}: ${log}`;
    });

    const appFormat = winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.timestamp(),
        defaultMessageFormat
    );

    const options = {
        levels: winston.config.syslog.levels,
        format: winston.format.combine(
            appFormat,
            winston.format.json()
        ),
        defaultMeta: {
            service: process.env.APP_NAME,
            env: process.env.NODE_ENV,
            index_name: 'delivery_stream'
        },
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    appFormat,
                ),
            })
        ]
    };

    const logger = winston.createLogger(options);

    logger.stream = {
        write: function(message, encoding) {
            logger.info(message.substring(0, message.lastIndexOf('\n')));
        }
    };

    return logger;
};
