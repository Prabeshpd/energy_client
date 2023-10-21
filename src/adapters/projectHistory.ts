import config from '@/config/config';
import { QueryHistoryType } from '@/types/query';

import { get } from './base';

export const fetchProjectHistoryYear = async (year: string) =>
  get(config.endpoints.fetchProjectHistory, { type: QueryHistoryType.HISTORY, year });

export const fetchProjectHistoryAnomaly = async () =>
  get(config.endpoints.fetchProjectHistory, { type: QueryHistoryType.ANOMALY });
