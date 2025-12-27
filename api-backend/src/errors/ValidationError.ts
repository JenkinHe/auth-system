export class ValidationError extends Error {
  statusCode: number;
  details?: string | undefined;

  constructor(message: string, details?: string) {
    super(message);
    this.name = "ValidationError";
    this.statusCode = 400;
    this.details = details;
  }
}
