import { createReadStream } from 'fs'
import { Context } from 'koa'
import { FieldValidationError } from '../../errors'
import { Config } from '../../lib/config'
import { JavaManager } from '../../managers'
import { BaseController } from '../base/controller'

export class JavaController extends BaseController {
  constructor(manager: JavaManager) {
    super(manager)
  }

  public async compile(ctx: Context) {
    const {
      body: { jdkVersion, args = [] },
      file: { filename }
    }: any = ctx.req
    if (!Config.JDK_VERSIONS.includes(jdkVersion)) {
      throw new FieldValidationError('jdkVersion参数错误', [
        {
          message: 'jdkVersion参数错误',
          type: 'client error',
          path: [ctx.path]
        }
      ])
    }
    const classPath: string = await this.manager.compile(
      filename,
      jdkVersion,
      args
    )
    ctx.type = 'class'
    ctx.status = 200
    ctx.body = createReadStream(classPath)
  }
}
