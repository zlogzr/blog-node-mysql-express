/*
 * @Author: zlogzr
 * @Date: 2022-08-12 10:33
 * @LastEditors: zlogzr
 * @LastEditTime: 2022-09-02 11:42
 * @FilePath: \blog-node-mysql-express\src\router\user.ts
 * @Description:
 */
import { Router } from 'express'
import { login, register, getMe, updateUser } from '../controller/user'
import { ErrorModel, SuccessModel } from '../utils/util'
import registerCheck from '../middleware/registerCheck'
import loginCheck from '../middleware/loginCheck'

const router = Router()

router.get('/me', (req: any, res, next) => {
  if (!req.session?.userid) {
    res.json(new ErrorModel('获取用户信息失败'))
    return
  }
  const result = getMe(req.session.userid)
  result.then(data => {
    if (!data.username) {
      res.json(new ErrorModel('获取用户信息失败'))
      return
    }
    res.json(new SuccessModel(data, '获取用户信息成功'))
  })
})

router.post('/login', (req: any, res, next) => {
  const { username, password } = req.body
  const result = login(username, password)
  result.then(data => {
    if (!data.username) {
      res.json(new ErrorModel('登录失败'))
      return
    }
    // 设置 session
    req.session.userid = data.id
    req.session.username = data.username
    req.session.realname = data.realname
    req.session.role = data.role
    res.json(new SuccessModel(data, '登录成功'))
  })
})

router.post('/register', registerCheck, function (req, res, next) {
  const { username, password } = req.body
  const result = register(username, password)
  result.then(data => {
    res.json(data.id ? new SuccessModel(data, '注册成功') : new ErrorModel('注册失败'))
  })
})

router.post('/updateUser', loginCheck, (req: any, res, next) => {
  const { username, password, realname } = req.body
  res.json(new ErrorModel('接口暂未完成，请稍后再试'))
  // const result = updateUser(username, password, realname)
})

export default router
