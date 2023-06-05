import compression from 'compression';
import cors from 'cors';
import express from 'express';
import httpStatus from 'http-status';
import xss from 'xss-clean';
import { errorConverter, errorHandler } from './middlewares/error';
import routes from './routes/v1';
import ApiError from './utils/ApiError';
import { ENV } from './utils/config';
import morgan from './utils/morgan';
import path from 'path';
// import helmet from 'helmet';

const app = express();

if (ENV.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
// app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options('*', cors());

// v1 api routes
app.use('/api/v1', routes);

/* `app.use(express.static('public'))` is serving static files from the `public` directory. This means
that any files in the `public` directory can be accessed by the client without any additional
routing. For example, if there is a file named `image.jpg` in the `public` directory, it can be
accessed by the client at the URL `http://localhost:port/image.jpg`. This is useful for serving
static assets like images, stylesheets, and client-side JavaScript files. */
app.use(
  express.static('public', {
    extensions: ['html', 'htm'],
  })
);

app.use(express.static(path.join(__dirname, 'views')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
