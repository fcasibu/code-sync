import pino from 'pino';

export const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  ...(!process.env.NO_PRETTY_LOGGING &&
    process.env.NODE_ENV !== 'production' && {
      transport: {
        target: 'pino-pretty',
      },
    }),
});
