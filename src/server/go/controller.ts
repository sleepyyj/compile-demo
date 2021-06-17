import { createReadStream } from 'fs'
import { Context } from 'koa'
import { FieldValidationError } from '../../errors'
import { Config } from '../../lib/config'
import { GoManager } from '../../managers'
import { BaseController } from '../base/controller'

export class GoController extends BaseController {
  constructor(manager: GoManager) {
    super(manager)
  }
  public async compile(ctx: Context) {
    const {
      body: { goVersion, args = [] },
      file: { filename }
    }: any = ctx.req
    if (!Config.GO_VERSIONS.includes(goVersion)) {
      throw new FieldValidationError('goVersion参数错误', [
        {
          message: 'goVersion参数错误',
          type: 'client error',
          path: [ctx.request.path]
        }
      ])
    }
    const exe: string = await this.manager.compile(filename, goVersion, args)
    ctx.type = 'exe'
    ctx.status = 200
    ctx.body = createReadStream(exe)
  }
}
