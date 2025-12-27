export class ForbiddenError extends Error {
  statusCode: number;
  details: string;

  constructor(message: string) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
    this.details = "";
  }
}
