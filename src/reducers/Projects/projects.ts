import { createSlice } from '@reduxjs/toolkit';

import { extraReducers } from './actions';

import Project from '@/types/projects';

export interface ProjectState {
  projects: Project[];
  isLoadingFetchProject: boolean;
}

const initialState: ProjectState = {
  projects: [],
  isLoadingFetchProject: false,
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {},
  extraReducers: extraReducers,
});

export const projectActions = projectSlice.actions;

export default projectSlice.reducer;
