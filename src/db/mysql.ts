import mysql, { escape } from 'mysql'
import { MYSQL_CONF } from '../config/db'

// 创建链接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始链接
con.connect()

// 统一执行 sql 的函数
function exec(sql: string) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise
}

export { exec, escape }
