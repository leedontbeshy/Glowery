export class ApiError extends Error {
    constructor(
        public statusCode: number,
        public message: string,
        public isOperation = true,
    ) {
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
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

export class ConflictError extends ApiError {
    constructor(message = 'Resource already exists') {
        super(409, message);
    }
}

export class InternalServerError extends ApiError {
    constructor(message = 'Internal Server Error') {
        super(500, message);
    }
}

export class DatabaseError extends ApiError {
    constructor(message = 'Database operation failed') {
        super(500, message);
    }
}
