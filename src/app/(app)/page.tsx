'use client';

import * as React from 'react';

import { isArray } from 'lodash';
import Select, { MultiValue } from 'react-select';

import AnomalyDetail from '@/components/AnomalyDetail/AnomalyDetail';
import BarChart from '@/components/BarChart/Barchart';
import ConsumptionOverview from '@/components/ConsumptionOverview/ConsumptionOverview';
import HeatChart from '@/components/HeatChart/HeatChart';
import Map from '@/components/Map/Map';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import { useUserFirebaseDatabase } from '@/hooks/useFirebaseDatabase';

import toast from '@/lib/toast';

import { fetchProject } from '@/reducers/Projects/actions';
import { fetchUser } from '@/reducers/User/actions';
import {
  setSelectedProjects,
  setProjectEnergyConsumptionDetail,
} from '@/reducers/Projects/projects';

import { RealTimeProjectData } from '@/types/projects';

export default function Dashboard() {
  const { projects, user, projectEnergyConsumptionDetail, isLoadingFetchProject } = useAppSelector(
    (state) => ({
      user: state.users.user,
      isLoadingFetchUser: state.users.isLoadingFetchUser,
      projects: state.projects.projects,
      isLoadingFetchProject: state.projects.isLoadingFetchProject,
      projectEnergyConsumptionDetail: state.projects.projectEnergyConsumptionDetail,
    })
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    async function useFetchProjectDispatch() {
      try {
        await Promise.all([dispatch(fetchProject()), dispatch(fetchUser())]);
      } catch (err) {
        toast('Unable to fetch projects', 'error');
      }
    }

    useFetchProjectDispatch();
  }, []);

  const projectOptions = projects.map((project) => ({
    label: project.projectName,
    value: project.id,
  }));

  const { loading, snapshots, error } = useUserFirebaseDatabase(user.id);

  React.useEffect(() => {
    if (!snapshots || (isArray(snapshots) && !snapshots.length)) return;

    dispatch(setProjectEnergyConsumptionDetail(snapshots as unknown as RealTimeProjectData[]));
  }, [loading, snapshots]);

  if (error) {
    toast('Cannot load project details', 'error');
  }

  const handleProjectChange = (selectedValues: MultiValue<{ label: string; value: string }>) => {
    const selectedProjectId = selectedValues.map((selectedValue) => selectedValue.value);
    const selectedProjects = projectEnergyConsumptionDetail.filter((project) =>
      selectedProjectId.includes(project.id)
    );

    dispatch(setSelectedProjects(selectedProjects));
  };

  return (
    <main className="layout-app">
      <header className="layout-app__heading">Energy Dashboard</header>

      <div className="layout-app__select">
        <Select
          name="categories"
          id="list-projects"
          aria-label="Category"
          className="react-select"
          classNamePrefix="react-select"
          isLoading={isLoadingFetchProject}
          options={projectOptions}
          onChange={(selectedOption) => handleProjectChange(selectedOption)}
          isMulti
          isClearable={true}
        />
      </div>
      <div className="layout-app__body">
        <div className="layout-app__chart">
          <Map />
          <HeatChart />
        </div>
        <div className="layout-app__chart">
          <ConsumptionOverview />
          <BarChart />
          <AnomalyDetail />
        </div>
      </div>
    </main>
  );
}
