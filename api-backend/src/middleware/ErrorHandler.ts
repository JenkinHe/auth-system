import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import { AuthError } from "../errors/AuthError";
import { ValidationError } from "../errors/ValidationError";
import { ForbiddenError } from "../errors/ForbiddenError";

@Middleware({ type: "after" })
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  error(
    error: ValidationError | ForbiddenError | AuthError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.error(error); // log internally

    // Use statusCode if available, otherwise 500
    const statusCode = error.statusCode || 500;

    // Standard error response
    res.status(statusCode).json({
      success: false,
      error: {
        name: error.name,
        message: error.message,
        details: error.details || null,
      },
    });
  }
}
