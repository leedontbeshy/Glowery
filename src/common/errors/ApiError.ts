export class ApiError extends Error{
    constructor(
        public statusCode: number,
        public message: string,
        public isOperation = true
    ){
        super(message);
        Object.setPrototypeOf(this,ApiError.prototype);
    }
}

export class BadRequestError extends ApiError {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}