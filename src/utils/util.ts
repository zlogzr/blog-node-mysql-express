class BaseModel {
  constructor(private data: any, private msg?: string) {
    if (typeof data === 'string') {
      this.msg = data
      this.data = null
    } else {
      this.data = data
      this.msg = msg
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data: any, msg?: string, private code?: number) {
    super(data, msg)
    this.code = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data: any, msg?: string, private code?: number) {
    super(data, msg)
    this.code = -1
  }
}

export { SuccessModel, ErrorModel }
