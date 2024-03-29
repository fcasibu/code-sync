import pinoHTTPLogger from 'pino-http';

export const loggerMiddleware = pinoHTTPLogger({
  transport: {
    target: 'pino-http-print',
  },
});
