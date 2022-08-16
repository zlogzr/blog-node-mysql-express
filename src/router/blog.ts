import { Router } from 'express'
import { getList, getDetail, newBlog, updateBlog, delBlog } from '../controller/blog'
import blogCheck from '../middleware/blogCheck'
import loginCheck from '../middleware/loginCheck'
import { ErrorModel, SuccessModel } from '../utils/util'

const router = Router()

router.get('/list', function (req: any, res: any, next: any) {
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  const result = getList(author, keyword)
  result.then(listData => {
    res.json(listData ? new SuccessModel(listData, '查询博客成功') : new ErrorModel('查询博客失败'))
  })
})

router.get('/detail', (req: any, res: any, next: any) => {
  const result = getDetail(req.query.id)
  result.then(data => {
    res.json(data ? new SuccessModel(data, '查询博客详情成功') : new ErrorModel('查询博客详情失败'))
  })
})

router.post('/new', loginCheck, (req: any, res: any, next: any) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  result.then(data => {
    res.json(data.id ? new SuccessModel(data, '新建博客成功') : new ErrorModel('新建博客失败'))
  })
})

router.post('/update', loginCheck, blogCheck, (req: any, res: any, next: any) => {
  const result = updateBlog(req.query.id, req.body)
  result.then(val =>
    res.json(val ? new SuccessModel('更新博客成功') : new ErrorModel('更新博客失败'))
  )
})

router.post('/del', loginCheck, blogCheck, (req: any, res: any, next: any) => {
  const result = delBlog(req.query.id)
  result.then(val => {
    res.json(val ? new SuccessModel('删除博客成功') : new ErrorModel('删除博客失败'))
  })
})

export default router
