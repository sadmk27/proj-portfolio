export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;

  constructor(
    message: string,
    statusCode: number = 400,
    code: string = "INTERNAL_ERROR",
  ) {
    super(message);
    this.name = "AppError";
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export function handleServerError(error: Error) {
  if (error instanceof AppError) {
    return {
      success: false as const,
      error: error.message,
      code: error.code,
      statusCode: error.statusCode,
    };
  }

  if (error instanceof Error) {
    console.error("Server Error:", error);
  }

  return {
    success: false as const,
    error: "An unexpected error occurred.",
    code: "INTERNAL_ERROR",
  };
}

export async function withErrorHandling<T>(
  operation: () => Promise<T>,
  errorMessage: string,
  statusCode: number = 400,
) {
  const error = new AppError(errorMessage, statusCode);

  try {
    const data = await operation();
    return { success: true as const, data };
  } catch {
    return handleServerError(error);
  }
}
