export class AuthError extends Error {
  statusCode: number;
  details: string;

  constructor(message: string) {
    super(message);
    this.name = "AuthError";
    this.statusCode = 401;
    this.details = "";
  }
}
