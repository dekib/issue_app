import { NextFunction, Request, Response } from 'express';

const { NODE_ENV } = process.env;

  /**
   * Used for error response
   * @param err
   * @param req
   * @param res
   * @param next
   */
function error (err: Error, req: Request, res: Response, next: NextFunction) {
  const status = 500;
  const message = (NODE_ENV === 'development') ? err.message : 'Error';
  res.status(status).send(message).end();
}

  /**
   * Used for ok status
   * @param req
   * @param res
   * @param next
   */
function ok (req: Request, res: Response, next: NextFunction) {
  res.status(201).end();
}

export {
      error,
      ok
  };
