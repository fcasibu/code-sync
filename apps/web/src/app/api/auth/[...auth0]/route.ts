import type {
  AfterCallbackAppRoute,
  AppRouteHandlerFn,
} from '@auth0/nextjs-auth0';
import { handleAuth, handleCallback, handleLogin } from '@auth0/nextjs-auth0';
import { env } from '@/env';
import { createUser, getUserByProviderAndProviderId } from '@/services';

// TODO: use custom auth0 db instead or not?
const afterCallback: AfterCallbackAppRoute = async (_req, session) => {
  const { email, sub } = session.user;
  if (sub && email) {
    const [provider, id] = (sub as string).split('|');
    const { user } = await getUserByProviderAndProviderId(provider, id);

    if (!user) {
      await createUser({
        input: {
          email: email as string,
          authProvider: provider,
          authId: id,
          displayName: session.user.name as string,
          profilePicture: session.user.picture as string,
        },
      });
    }
  }

  return session;
};

export const GET = handleAuth({
  callback: handleCallback({ afterCallback }),
  login: handleLogin({
    returnTo: '/',
    authorizationParams: {
      audience: env.AUTH0_AUDIENCE,
      scope: 'openid profile email',
    },
  }),
}) as AppRouteHandlerFn;
