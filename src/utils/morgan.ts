import morgan from 'morgan';
import { ENV } from './config';
import logger from './logger';

import { ServerResponse } from 'http';
import { NextFunction, Request, Response } from 'express';

interface CustomServerResponse extends ServerResponse {
  locals?: Record<string, any>;
}
morgan.token('message', (_, res: CustomServerResponse) => res?.locals?.errorMessage || '');

const getIpFormat = () => (ENV.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
  skip: (req, res: CustomServerResponse) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
  skip: (req, res: CustomServerResponse) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

const bodyHandler = (req: Request, res: Response, next: NextFunction) => {
  if (req.body) {
    res.locals.body = JSON.stringify(req.body);
  }
  next();
};

export default { successHandler, errorHandler, bodyHandler };
