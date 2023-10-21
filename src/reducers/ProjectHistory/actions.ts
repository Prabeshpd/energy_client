import { AxiosError } from 'axios';
import {
  ActionReducerMapBuilder,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

import * as projectHistoryAdapter from '@/adapters/projectHistory';
import { ProjectHistoryYear, ProjectHistoryAnomaly } from '@/types/ProjectHistory';

import { ProjectState } from './projectHistory';

export const FETCH_PROJECT_HISTORY_YEAR_ACTION = 'fetch/projectHistory/year';
export type FETCH_PROJECT_HISTORY_YEAR_ACTION = typeof FETCH_PROJECT_HISTORY_YEAR_ACTION;

export const FETCH_PROJECT_HISTORY_ANOMALY_ACTION = 'fetch/projectHistory/anomaly';
export type FETCH_PROJECT_HISTORY_ANOMALY_ACTION = typeof FETCH_PROJECT_HISTORY_ANOMALY_ACTION;

export const fetchProjectHistoryYearAction: AsyncThunkPayloadCreator<
  ProjectHistoryYear[],
  string,
  any
> = async (year, { rejectWithValue }) => {
  try {
    const project = (await projectHistoryAdapter.fetchProjectHistoryYear(
      year
    )) as unknown as ProjectHistoryYear[];

    return project;
  } catch (error: any) {
    const axiosError = error as unknown as AxiosError;

    if (!axiosError.response) {
      throw error;
    }

    const { data, status } = axiosError.response;

    return rejectWithValue({ data, status });
  }
};

export const fetchProjectHistoryAnomalyAction: AsyncThunkPayloadCreator<
  ProjectHistoryAnomaly[],
  void,
  any
> = async (_, { rejectWithValue }) => {
  try {
    const project =
      (await projectHistoryAdapter.fetchProjectHistoryAnomaly()) as unknown as ProjectHistoryAnomaly[];

    return project;
  } catch (error: any) {
    const axiosError = error as unknown as AxiosError;

    if (!axiosError.response) {
      throw error;
    }

    const { data, status } = axiosError.response;

    return rejectWithValue({ data, status });
  }
};

export const fetchProjectHistoryByYear = createAsyncThunk(
  FETCH_PROJECT_HISTORY_YEAR_ACTION,
  fetchProjectHistoryYearAction
);

export const fetchProjectHistoryByAnomaly = createAsyncThunk(
  FETCH_PROJECT_HISTORY_ANOMALY_ACTION,
  fetchProjectHistoryAnomalyAction
);

export const extraReducers: (builder: ActionReducerMapBuilder<ProjectState>) => void = (
  builder
) => {
  builder.addCase(
    fetchProjectHistoryByYear.fulfilled,
    (state: ProjectState, action: PayloadAction<ProjectHistoryYear[]>) => {
      state.isLoadingFetchProjectHistoryByYear = false;
      state.projectsHistoryByYear = action.payload;
    }
  );

  builder.addCase(fetchProjectHistoryByYear.rejected, (state: ProjectState) => {
    state.isLoadingFetchProjectHistoryByYear = false;
  });

  builder.addCase(fetchProjectHistoryByYear.pending, (state: ProjectState) => {
    state.isLoadingFetchProjectHistoryByYear = true;
  });

  builder.addCase(
    fetchProjectHistoryByAnomaly.fulfilled,
    (state: ProjectState, action: PayloadAction<ProjectHistoryAnomaly[]>) => {
      state.isLoadingFetchProjectHistoryByAnomaly = false;
      state.projectHistoryByAnomaly = action.payload;
    }
  );

  builder.addCase(fetchProjectHistoryByAnomaly.rejected, (state: ProjectState) => {
    state.isLoadingFetchProjectHistoryByAnomaly = false;
  });

  builder.addCase(fetchProjectHistoryByAnomaly.pending, (state: ProjectState) => {
    state.isLoadingFetchProjectHistoryByAnomaly = true;
  });
};
