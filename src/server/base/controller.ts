import { Context } from 'koa'
import { BaseManager } from '../../managers'

export class BaseController {
  public manager: BaseManager

  constructor(manager: BaseManager) {
    this.manager = manager
  }

  public async compile(ctx: Context) {
    ctx.status = 200
    ctx.body = 'success'
  }
}
