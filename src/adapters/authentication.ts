import config from '@/config/config';

import { setToken, clearToken } from '@/helpers/authentication';
import { setAuthTokenCookie, clearAuthTokenCookie } from '@/lib/cookies';
import { LoginRequest, LoginResponse } from '@/types/auth';

import { post } from './base';

export const login = async (loginPayload: LoginRequest) => {
  const response = (await post(config.endpoints.login, loginPayload)) as unknown as LoginResponse;

  setToken(response.accessToken, response.refreshToken);
  setAuthTokenCookie(response.accessToken);

  return response;
};

export const logout = () => {
  clearToken();
  clearAuthTokenCookie();
};
