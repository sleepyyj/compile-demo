import * as log4js from 'log4js'

log4js.configure({
  appenders: {
    console: {
      type: 'console'
    },
    datelog: {
      type: 'dateFile',
      filename: 'access',
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      compress: true,
      daysToKeep: 30
    }
  },
  categories: {
    default: {
      appenders: ['console'],
      level: 'debug'
    },
    datelog: {
      appenders: ['console', 'datelog'],
      level: 'debug'
    }
  },
  pm2: true
})

export const getLogger = (type: string) => {
  return log4js.getLogger(type)
}
