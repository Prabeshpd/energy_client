import { AxiosError } from 'axios';
import {
  ActionReducerMapBuilder,
  AsyncThunkPayloadCreator,
  createAsyncThunk,
  PayloadAction,
} from '@reduxjs/toolkit';

import * as projectAdapter from '@/adapters/projects';
import Project from '@/types/projects';

import { ProjectState } from './projects';

export const FETCH_PROJECT_ACTION = 'fetch/project';
export type FETCH_PROJECT_ACTION = typeof FETCH_PROJECT_ACTION;

export const fetchProjectAction: AsyncThunkPayloadCreator<Project[], void> = async (
  _,
  { rejectWithValue }
) => {
  try {
    const project = (await projectAdapter.fetchProjects()) as unknown as Project[];

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

export const fetchProject = createAsyncThunk(FETCH_PROJECT_ACTION, fetchProjectAction);

export const extraReducers: (builder: ActionReducerMapBuilder<ProjectState>) => void = (
  builder
) => {
  builder.addCase(
    fetchProject.fulfilled,
    (state: ProjectState, action: PayloadAction<Project[]>) => {
      state.isLoadingFetchProject = false;
      state.projects = action.payload;
    }
  );

  builder.addCase(fetchProject.rejected, (state: ProjectState) => {
    state.isLoadingFetchProject = false;
  });

  builder.addCase(fetchProject.pending, (state: ProjectState) => {
    state.isLoadingFetchProject = true;
  });
};
