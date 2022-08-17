import { exec, escape } from '../db/mysql'
import { genPassword } from '../utils/cryp'

const login = (username: any, password: any) => {
  // 防止sql注入，将特殊字符转换
  username = escape(username)
  // password = genPassword(password) // 生成加密密码
  password = escape(password)

  const sql = `
        select id,username,realname,role,createtime from users where username=${username} and password=${password}
    `
  return exec(sql).then((rows: any) => rows[0] || {})
}

const register = (username: any, password: any) => {
  // 防止sql注入，将特殊字符转换
  username = escape(username)
  // password = genPassword(password) // 生成加密密码
  password = escape(password)
  const createtime = Date.now()

  const sql = `
        insert into users (username, password, createtime) value (${username},${password},${createtime})
    `
  return exec(sql).then((insertData: any) => ({
    id: insertData.insertId
  }))
}

export { login, register }
