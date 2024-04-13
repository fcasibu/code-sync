import cors from 'cors';
import { CorsUnsafeDomainError } from '@/errors';

export const corsMiddleware = (
  whiteListedDomains: (string | undefined)[] = [],
) =>
  cors({
    origin: (origin, callback) => {
      if (whiteListedDomains.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new CorsUnsafeDomainError(origin));
      }
    },
  });
