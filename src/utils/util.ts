class BaseModel {
  constructor(private data: any, private message?: string) {
    if (typeof data === 'string') {
      this.message = data
      this.data = null
    } else {
      this.data = data
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data: any, message?: string, private code?: number) {
    super(data, message)
    this.code = 0
  }
}

class ErrorModel extends BaseModel {
  constructor(data: any, message?: string, private code?: number) {
    super(data, message)
    this.code = -1
  }
}

export { SuccessModel, ErrorModel }
