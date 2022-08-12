import express from 'express'
import fs from 'fs'
import path from 'path'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import connectRedis from 'connect-redis'
import redisClient from './db/redis'
import blogRouter from './router/blog'
import userRouter from './router/user'

const app = express()

// 日志中间件
const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境 / 测试环境
  app.use(logger('dev'))
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  app.use(logger('combined', { stream: writeStream }))
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// session 中间件
const RedisStore = connectRedis(session)
const sessionStore = new RedisStore({
  client: redisClient
})
app.use(
  session({
    resave: false, // 添加 resave 选项
    saveUninitialized: true, // 添加 saveUninitialized 选项
    secret: 'WJiol_#87834',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    },
    store: sessionStore
  })
)

app.use('/api/blog', blogRouter)
app.use('/api/user', userRouter)

app.listen(7001, () => {
  console.log('server is running')
})
