import { getAllUser } from './../controller/user'
import { ErrorModel } from '../utils/util'

const registerCheck = async (req: any, res: any, next: any) => {
  const result: any = await getAllUser()
  if (result.find((item: any) => item.username === req.body.username)) {
    res.json(new ErrorModel('注册失败'))
    return
  }
  next()
}

export default registerCheck
