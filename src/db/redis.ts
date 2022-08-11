import redis from 'redis'
import { REDIS_CONF } from '../config/db'

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error(err)
})

export default redisClient
