import xss from 'xss'
import { exec } from '../db/mysql'

const getList = (author?: string, keyword?: string) => {
  let sql = `select * from blogs where 1=1 `
  if (author) {
    sql += `and author='${author}' `
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `
  }
  sql += `order by createtime desc;`

  // 返回 promise
  return exec(sql)
}

const getDetail = (id: number) => {
  const sql = `select * from blogs where id='${id}'`
  return exec(sql).then((rows: any) => rows[0])
}

const newBlog = (blogData: any = {}) => {
  // blogData 是一个博客对象，包含 title content author 属性
  const title = xss(blogData.title)
  const content = xss(blogData.content)
  const author = blogData.author
  const createtime = Date.now()

  const sql = `
        insert into blogs (title, content, author, createtime)
        values ('${title}', '${content}', '${author}', ${createtime});
    `

  return exec(sql).then((insertData: any) => ({
    id: insertData.insertId
  }))
}

const updateBlog = (id: number, blogData: any = {}) => {
  // id 就是要更新博客的 id
  // blogData 是一个博客对象，包含 title content 属性
  const title = xss(blogData.title)
  const content = xss(blogData.content)

  const sql = `
        update blogs set title='${title}', content='${content}' where id=${id};
    `
  return exec(sql).then((updateData: any) => updateData.affectedRows > 0)
}

const delBlog = (id: any) => {
  // id 就是要删除博客的 id
  const sql = `delete from blogs where id='${id}';`
  return exec(sql).then((delData: any) => delData.affectedRows > 0)
}

export { getList, getDetail, newBlog, updateBlog, delBlog }
