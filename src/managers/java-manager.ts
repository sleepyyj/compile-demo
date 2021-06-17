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

export class JavaManager extends BaseManager {
  constructor(logger: Logger) {
    super(logger)
  }
  public async compile(
    filename: string,
    jdkVersion: string,
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
      const javaFile = path.resolve('uploads', filename)
      await execFile(`${Config.JAVA_HOME}/${jdkVersion}/bin/javac`, [
        '-d',
        path.resolve('classes'),
        javaFile,
        ...argsArr
      ])
      await unlink(javaFile)
      return path.resolve('classes', filename.split('.')[0] + '.class')
    } catch (error) {
      this.logger.error('编译java文件出错', error)
      throw new AppError(10000, '', error)
    }
  }
}
