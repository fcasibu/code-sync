import { createEnv } from '@t3-oss/env-nextjs';
import { z } from '@code-sync/validations';

export const env = createEnv({
  server: {
    // BFF
    BFF_URL: z.string().url(),

    // Auth0
    AUTH0_SECRET: z.string(),
    AUTH0_BASE_URL: z.string().url(),
    AUTH0_ISSUER_BASE_URL: z.string(),
    AUTH0_CLIENT_ID: z.string(),
    AUTH0_CLIENT_SECRET: z.string(),
    AUTH0_AUDIENCE: z.string(),

    // Web
    APP_URL: z.string().url(),

    // API header key
    INTERNAL_HEADER_API_KEY_VALUE: z.string(),
  },
  experimental__runtimeEnv: {},
});
