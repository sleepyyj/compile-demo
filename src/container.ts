import { Logger } from 'log4js'
import { GoManager, JavaManager } from './managers'

export interface ServiceContainer {
  logger: Logger
  managers: {
    go: GoManager
    java: JavaManager
  }
}

export function createContainer(logger: Logger): ServiceContainer {
  return {
    logger,
    managers: {
      java: new JavaManager(logger),
      go: new GoManager(logger)
    }
  }
}
