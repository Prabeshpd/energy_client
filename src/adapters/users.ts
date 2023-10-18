import config from '@/config/config';
import { RegisterPayload } from '@/types/auth';

import { post } from './base';

export const createUser = async (payload: RegisterPayload) =>
  post(config.endpoints.createUser, payload);
