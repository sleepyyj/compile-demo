import * as Koa from 'koa'
import * as multer from 'koa-multer'
import * as Router from 'koa-router'
import { ServiceContainer } from '../../container'
import { JavaController } from './controller'

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage })

export function init(server: Koa, container: ServiceContainer) {
  const router = new Router({ prefix: '/api/v1/compile' })
  const controller = new JavaController(container.managers.java)

  router.post(
    '/java',
    upload.single('javaFile'),
    controller.compile.bind(controller)
  )

  server.use(router.routes())
}
