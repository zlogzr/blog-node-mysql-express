import crypto from 'crypto'

// 密匙
const SECRET_KEY = 'WJiol_8776#'

// md5 加密
function md5(content: string) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 加密函数
export function genPassword(password: string) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}
