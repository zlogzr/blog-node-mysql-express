import { createClient } from 'redis'
import { REDIS_CONF } from './config'

// 创建客户端
const redisClient = createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error(err)
})
export default redisClient
