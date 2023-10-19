import config from '@/config/config';

import { setToken } from '@/helpers/authentication';
import { LoginRequest, LoginResponse } from '@/types/auth';

import { post } from './base';

export const login = async (loginPayload: LoginRequest) => {
  const response = (await post(config.endpoints.login, loginPayload)) as unknown as LoginResponse;

  setToken(response.accessToken, response.refreshToken);

  return response;
};
