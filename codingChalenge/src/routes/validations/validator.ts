import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';
import { inspect } from 'util';

export class Validator {

  static val(validationChain: ValidationChain[]): RequestHandler[] {
    return [...validationChain, Validator.validateRequest];
  }

  private static validateRequest(request?: Request, response?: Response, next?: NextFunction) {
    const result = validationResult(request);
    const errors = result.mapped();

    if (!result.isEmpty()) {
      return next(new Error(inspect(errors)));
    }

    return next();
  }
}
