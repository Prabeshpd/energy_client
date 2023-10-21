'use client';

import * as React from 'react';
import Select, { MultiValue } from 'react-select';

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

  const firebaseData = useUserFirebaseDatabase(user.id);

  if (!firebaseData) return;

  const { loading, snapshots, error } = firebaseData;

  if (snapshots) {
    const data = snapshots as unknown as RealTimeProjectData[];

    dispatch(setProjectEnergyConsumptionDetail(data));
  }

  if (error) {
    toast('Cannot fetch data from firebase', 'error');
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
      <header>Energy Dashboard</header>
      <div>
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
      <Map />
    </main>
  );
}
