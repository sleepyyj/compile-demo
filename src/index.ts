import { createContainer } from './container'
import { getLogger } from './lib/log'
import { createServer } from './server'

export async function init() {
  const logger = getLogger('datelog')

  try {
    // Starting the HTTP server
    logger.info('Starting HTTP server')

    const port = Number(process.env.PORT) || 8081
    const container = createContainer(logger)
    const app = createServer(container)

    app.listen(port)

    logger.info(`Application running on port: ${port}`)
  } catch (e) {
    logger.error(e, 'An error occurred while initializing application.')
  }
}

init()
