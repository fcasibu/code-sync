const cspConfig = {
  'default-src': ['none'],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'connect-src': ["'self'", process.env.BFF_URL],
  'img-src': ["'self'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'worker-src': ['blob:'],
  'font-src': ["'self'", 'data:'],
  'frame-ancestors': ["'self'"],
  'upgrade-insecure-requests': [],
};

const csp = Object.entries(cspConfig)
  .map(
    ([key, value]) =>
      `${key} ${[...new Set(value)].filter(Boolean).join(' ')};`,
  )
  .join(' ')
  .replace(/\s+/g, ' ')
  .trim();

module.exports = [
  {
    key: 'Content-Security-Policy',
    value: csp,
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },

  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
];
