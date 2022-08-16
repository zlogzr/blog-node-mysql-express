import { getList } from '../controller/blog'
import { ErrorModel } from '../utils/util'

const blogCheck = async (req: any, res: any, next: any) => {
  const result: any = await getList(req.session.username)
  if (req.session.role === 0 && result.findIndex((item: any) => item.id === req.query.id) === -1) {
    res.json(new ErrorModel('权限不足'))
    return
  }
  next()
}
export default blogCheck
