import { Logger } from 'log4js'

export class BaseManager {
  public logger: Logger
  constructor(logger: Logger) {
    this.logger = logger
  }
  public async compile(
    filename: string,
    goVersion: string,
    args: string[]
  ): Promise<string> {
    return ''
  }
}
