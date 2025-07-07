"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
};
class Logger {
    constructor() {
        this.level = process.env.NODE_ENV === 'production' ? logLevels.info : logLevels.debug;
    }
    log(level, message, ...args) {
        const timestamp = new Date().toISOString();
        console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`, ...args);
    }
    error(message, ...args) {
        if (this.level >= logLevels.error) {
            this.log('error', message, ...args);
        }
    }
    warn(message, ...args) {
        if (this.level >= logLevels.warn) {
            this.log('warn', message, ...args);
        }
    }
    info(message, ...args) {
        if (this.level >= logLevels.info) {
            this.log('info', message, ...args);
        }
    }
    debug(message, ...args) {
        if (this.level >= logLevels.debug) {
            this.log('debug', message, ...args);
        }
    }
}
exports.logger = new Logger();
