import { ErrorModel } from '../utils/util'

export default (req: any, res: any, next: any) => {
  if (req.session.username) {
    next()
    return
  }
  res.json(new ErrorModel('尚未登录'))
}
