import config from '@/config/config';
import { QueryHistoryType } from '@/types/query';
import { ProjectHistoryYearRequest, ProjectHistoryAnomalyRequest } from '@/types/projectHistory';

import { get } from './base';

export const fetchProjectHistoryYear = async (requestParams: ProjectHistoryYearRequest) =>
  get(config.endpoints.fetchProjectHistory, {
    type: QueryHistoryType.HISTORY,
    year: requestParams.year,
    projectIds: requestParams.projectIds,
  });

export const fetchProjectHistoryAnomaly = async (requestParams: ProjectHistoryAnomalyRequest) =>
  get(config.endpoints.fetchProjectHistory, {
    type: QueryHistoryType.ANOMALY,
    projectIds: requestParams.projectIds,
  });
