'use client';

import * as React from 'react';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import toast from '@/lib/toast';
import { fetchProjectHistoryByAnomaly } from '@/reducers/ProjectHistory/actions';

const ProjectAnomaly = () => {
  const dispatch = useAppDispatch();

  const { projectHistoryByAnomaly, isLoading, projects } = useAppSelector((state) => ({
    projectHistoryByAnomaly: state.projectHistory.projectHistoryByAnomaly,
    isLoading: state.projectHistory.isLoadingFetchProjectHistoryByAnomaly,
    projects: state.projects.projects,
  }));

  React.useEffect(() => {
    async function dispatchFetchProjectHistory() {
      try {
        await dispatch(fetchProjectHistoryByAnomaly());
      } catch (err) {
        toast('Unable to show project anomaly', 'error');
      }
    }

    dispatchFetchProjectHistory();
  }, []);

  const data = projectHistoryByAnomaly.map((project) => {
    const projectDetail = projects.find((projectDetail) => projectDetail.id == project.projectId);

    return {
      maxEnergyConsumption: project.maxEnergyConsumption,
      minEnergyConsumption: project.minEnergyConsumption,
      name: projectDetail?.projectName,
      time: project.time,
    };
  });

  return (
    <div>
      {data.map((datum) => (
        <div>
          <p>{datum.maxEnergyConsumption}</p>
          <p>{datum.minEnergyConsumption}</p>
          <p>{datum.time}</p>
          <p>{datum.maxEnergyConsumption}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectAnomaly;
