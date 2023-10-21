import { createSlice } from '@reduxjs/toolkit';

import { extraReducers, reducers } from './actions';

import Project, { RealTimeProjectData } from '@/types/projects';

export interface ProjectState {
  projects: Project[];
  projectEnergyConsumptionDetail: RealTimeProjectData[];
  isLoadingFetchProject: boolean;
  selectedProjects: RealTimeProjectData[];
}

const initialState: ProjectState = {
  projects: [],
  projectEnergyConsumptionDetail: [],
  isLoadingFetchProject: false,
  selectedProjects: [],
};

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers,
  extraReducers: extraReducers,
});

export const { setProjectEnergyConsumptionDetail, setSelectedProjects } = projectSlice.actions;

export default projectSlice.reducer;
