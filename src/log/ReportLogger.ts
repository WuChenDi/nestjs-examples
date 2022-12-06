import { ConsoleLogger } from '@nestjs/common'

export class ReportLogger extends ConsoleLogger {
  verbose(message: string) {
    console.log('【Verbose】日志上报', message)
    // eslint-disable-next-line prefer-rest-params
    super.verbose.apply(this, arguments)
  }

  log(message: string) {
    console.log('【Log】日志上报', message)
    // eslint-disable-next-line prefer-rest-params
    super.log.apply(this, arguments)
  }

  debug(message: string) {
    console.log('【Debug】日志上报', message)
    // eslint-disable-next-line prefer-rest-params
    super.debug.apply(this, arguments)
  }

  warn(message: string) {
    console.log('【Warn】日志上报', message)
    // eslint-disable-next-line prefer-rest-params
    super.warn.apply(this, arguments)
  }

  error(message: string) {
    console.error('【Error】日志上报', message)
    // eslint-disable-next-line prefer-rest-params
    super.error.apply(this, arguments)
  }
}
