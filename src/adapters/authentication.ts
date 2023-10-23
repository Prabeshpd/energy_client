import config from '@/config/config';

import { setToken, clearToken } from '@/helpers/authentication';
import { setAuthTokenCookie, clearAuthTokenCookie } from '@/lib/cookies';
import { LoginRequest, LoginResponse } from '@/types/auth';

import { post } from './base';

export const login = async (loginPayload: LoginRequest) => {
  const { data } = (await post(config.endpoints.login, loginPayload)) as unknown as {
    data: LoginResponse;
  };

  setToken(data.accessToken, data.refreshToken);
  setAuthTokenCookie(data.accessToken);

  return data;
};

export const logout = () => {
  clearToken();
  clearAuthTokenCookie();
};
