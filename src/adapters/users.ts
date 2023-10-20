import config from '@/config/config';
import { RegisterPayload } from '@/types/auth';

import { post, get } from './base';

export const createUser = async (payload: RegisterPayload) =>
  post(config.endpoints.createUser, payload);

export const fetchCurrentUser = async () => get(config.endpoints.fetchUser);
