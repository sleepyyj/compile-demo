import * as cp from 'child_process'
import * as fs from 'fs'
import { Logger } from 'log4js'
import * as path from 'path'
import * as util from 'util'
import { AppError } from '../errors'
import { Config } from '../lib/config'
import { BaseManager } from './base-manager'
const execFile = util.promisify(cp.execFile)
const unlink = util.promisify(fs.unlink)

export class GoManager extends BaseManager {
  constructor(logger: Logger) {
    super(logger)
  }
  public async compile(
    filename: string,
    goVersion: string,
    args: string[]
  ): Promise<string> {
    try {
      const argsArr = []
      for (const arg of args) {
        if (arg.indexOf(' ') > -1) {
          argsArr.push(...arg.split(' '))
        } else {
          argsArr.push(arg)
        }
      }
      const goFile = path.resolve('uploads', filename)
      await execFile(`${Config.GO_HOME}/${goVersion}/bin/go`, [
        'build',
        goFile,
        ...argsArr
      ])
      await unlink(goFile)
      return path.resolve(filename.split('.')[0] + '.exe')
    } catch (error) {
      this.logger.error('编译go文件出错', error)
      throw new AppError(10000, '', error)
    }
  }
}
