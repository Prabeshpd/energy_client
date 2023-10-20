import config from '@/config/config';

import { get } from './base';

export const fetchProjects = async () => get(config.endpoints.fetchProjects);
