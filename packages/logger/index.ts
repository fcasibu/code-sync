import pino from 'pino';

export default pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  ...(!process.env.NON_PRETTY && {
    transport: {
      target: 'pino-pretty',
    },
  }),
});
