enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug',
}

type LogMethod = (message: string, ...args: any[]) => void

class Logger {
  private context: string
  private level: LogLevel

  constructor(context: string) {
    this.context = context
    this.level = (import.meta.env.VITE_LOG_LEVEL as LogLevel) || LogLevel.INFO
  }

  private shouldLog(level: LogLevel): boolean {
    const levels = Object.values(LogLevel)
    const currentLevelIndex = levels.indexOf(this.level)
    const requestedLevelIndex = levels.indexOf(level)

    return requestedLevelIndex <= currentLevelIndex
  }

  private createLogMethod(level: LogLevel): LogMethod {
    return (message: string, ...args: any[]) => {
      if (!this.shouldLog(level)) return

      const timestamp = new Date().toISOString()
      const prefix = `[${timestamp}] [${level.toUpperCase()}] [${this.context}]`

      if (args.length > 0) {
        console[level](`${prefix} ${message}`, ...args)
      } else {
        console[level](`${prefix} ${message}`)
      }
    }
  }

  public error: LogMethod = this.createLogMethod(LogLevel.ERROR)
  public warn: LogMethod = this.createLogMethod(LogLevel.WARN)
  public info: LogMethod = this.createLogMethod(LogLevel.INFO)
  public debug: LogMethod = this.createLogMethod(LogLevel.DEBUG)

  public setLevel(level: LogLevel): void {
    this.level = level
  }
}

export default function createLogger(context: string): Logger {
  return new Logger(context)
}