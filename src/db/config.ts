import { ConnectionConfig } from 'mysql'

interface IREDIS_CONF {
  port: number
  host: string
}
// 配置
let MYSQL_CONF: ConnectionConfig
let REDIS_CONF: IREDIS_CONF

const env = process.env.NODE_ENV // 环境参数

console.log(env, 'env')
if (env === 'dev') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'myzy9910',
    port: 3306,
    database: 'myblog'
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  // mysql
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'myzy9910',
    port: 3306,
    database: 'myblog'
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

export { MYSQL_CONF, REDIS_CONF }
