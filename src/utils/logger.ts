const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

class Logger {
   private readonly level: number;

  constructor() {
    this.level = process.env.NODE_ENV === 'production' ? logLevels.info : logLevels.debug;
  }

  private log(level: string, message: string, ...args: any[]): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level.toUpperCase()}] ${message}`, ...args);
  }

  error(message: string, ...args: any[]): void {
    if (this.level >= logLevels.error) {
      this.log('error', message, ...args);
    }
  }

  warn(message: string, ...args: any[]): void {
    if (this.level >= logLevels.warn) {
      this.log('warn', message, ...args);
    }
  }

  info(message: string, ...args: any[]): void {
    if (this.level >= logLevels.info) {
      this.log('info', message, ...args);
    }
  }

  debug(message: string, ...args: any[]): void {
    if (this.level >= logLevels.debug) {
      this.log('debug', message, ...args);
    }
  }
}

export const logger = new Logger();