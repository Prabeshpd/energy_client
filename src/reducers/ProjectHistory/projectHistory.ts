import { createSlice } from '@reduxjs/toolkit';

import { extraReducers } from './actions';

import { ProjectHistoryAnomaly, ProjectHistoryYear } from '@/types/ProjectHistory';

export interface ProjectState {
  projectsHistoryByYear: ProjectHistoryYear[];
  projectHistoryByAnomaly: ProjectHistoryAnomaly[];
  isLoadingFetchProjectHistoryByYear: boolean;
  isLoadingFetchProjectHistoryByAnomaly: boolean;
}

const initialState: ProjectState = {
  projectsHistoryByYear: [],
  projectHistoryByAnomaly: [],
  isLoadingFetchProjectHistoryByYear: false,
  isLoadingFetchProjectHistoryByAnomaly: false,
};

export const projectHistorySlice = createSlice({
  name: 'projectHistory',
  initialState,
  reducers: {},
  extraReducers: extraReducers,
});

export const projectHistoryActions = projectHistorySlice.actions;

export default projectHistorySlice.reducer;
