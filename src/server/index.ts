import { Server } from 'http'
import * as Koa from 'koa'
import * as helmet from 'koa-helmet'
import { ServiceContainer } from '../container'
import * as go from './go'
import * as java from './java'
import * as middlewares from './middlewares'

export class AppServer {
  private app: Koa
  private server: Server

  constructor(app: Koa) {
    this.app = app
  }

  public listen(port: number): Server {
    this.server = this.app.listen(port)
    return this.server
  }

  public getServer(): Server {
    return this.server
  }
}

export function createServer(container: ServiceContainer): AppServer {
  const app = new Koa()
  const appSrv = new AppServer(app)

  // Register Middlewares
  app.use(helmet())
  app.use(middlewares.responseTime)
  app.use(middlewares.logRequest(container.logger))
  app.use(middlewares.errorHandler(container.logger))

  // Register routes
  java.init(app, container)
  go.init(app, container)

  return appSrv
}
