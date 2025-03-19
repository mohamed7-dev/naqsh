class AppError extends Error {
  statusCode: number;
  message: string;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // Capture the stack trace, excluding the constructor call
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
class HttpException extends AppError {
  constructor(statusCode: number, message: string) {
    super(message, statusCode);

    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name;

    // Capture the stack trace, excluding the constructor call
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static BadRequest(message: string = "Bad Request") {
    return new HttpException(400, message);
  }

  static Unauthorized(message: string = "Unauthorized") {
    return new HttpException(401, message);
  }

  static Forbidden(message: string = "Forbidden") {
    return new HttpException(403, message);
  }

  static NotFound(message: string = "Not Found") {
    return new HttpException(404, message);
  }
  static Conflict(message: string = "Conflict") {
    return new HttpException(409, message);
  }

  static InternalServerError(message: string = "Internal Server Error") {
    return new HttpException(500, message);
  }

  static ServiceUnavailable(message: string = "Service Unavailable") {
    return new HttpException(503, message);
  }
}
class ValidationException extends AppError {
  constructor(cause: any) {
    super("Bad request, Invalid data!", 400);
    this.cause = cause;
    this.name = this.constructor.name;
  }
}

function logErrorToService(error: unknown) {
  // Replace this with an actual logging service integration
  if (error instanceof AppError) {
    console.error("Error logged:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      statusCode: error.statusCode,
    });
  }
  if (error instanceof Error)
    console.error("Error logged:", {
      name: error.name,
      message: error.message,
      stack: error.stack,
      statusCode: 500,
    });
}

const handleError = (err: unknown, inputs?: unknown) => {
  // Log the error to an external service or internal logging system
  logErrorToService(err);
  const defaultInputs = inputs ? inputs : null;
  if (err instanceof ValidationException || err instanceof HttpException) {
    return {
      error: true,
      name: err.name,
      message: err.message,
      code: err.statusCode,
      cause: err.cause,
      inputs: defaultInputs,
    };
  } else {
    return {
      error: true,
      name: "InternalServerError",
      message: "An unexpected error occured, please, try again later!",
      code: 500,
      inputs: defaultInputs,
    };
  }
};

export { handleError, HttpException, ValidationException };
