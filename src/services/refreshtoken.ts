import * as authenticationAdapter from '@/adapters/authentication';
import { clearToken, setToken } from '@/helpers/authentication';
import { setAuthTokenCookie } from '@/lib/cookies';

export const refreshToken = async (token: string): Promise<void> => {
  await authenticationAdapter
    .refreshToken(token)
    .then((response: any) => {
      setToken(response.accessToken, token);
      setAuthTokenCookie(response.accessToken);
    })
    .catch(() => {
      clearToken();

      window.location.href = '/auth/login';
    });
};
