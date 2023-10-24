'use client';

import * as React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';

import { useAppDispatch, useAppSelector } from '@/hooks/store';
import toast from '@/lib/toast';
import { fetchProjectHistoryByAnomaly } from '@/reducers/ProjectHistory/actions';

const AnomalyDetail = () => {
  const dispatch = useAppDispatch();

  const { projectHistoryByAnomaly, isLoading, projects, selectedProject } = useAppSelector(
    (state) => ({
      projectHistoryByAnomaly: state.projectHistory.projectHistoryByAnomaly,
      isLoading: state.projectHistory.isLoadingFetchProjectHistoryByAnomaly,
      projects: state.projects.projects,
      selectedProject: state.projects.selectedProjects,
    })
  );

  React.useEffect(() => {
    async function dispatchFetchProjectHistory() {
      try {
        const projectIds = selectedProject.map((project) => project.id);
        await dispatch(fetchProjectHistoryByAnomaly({ projectIds }));
      } catch (err) {
        toast('Unable to show project anomaly', 'error');
      }
    }

    dispatchFetchProjectHistory();
  }, [selectedProject]);

  const data = projectHistoryByAnomaly.map((project) => {
    const projectDetail = projects.find((projectDetail) => projectDetail.id == project.projectId);

    return {
      maxEnergyConsumption: project.maximumEnergyConsumption,
      minEnergyConsumption: project.minimumEnergyConsumption,
      name: projectDetail?.projectName,
    };
  });

  return (
    <div className="anomaly-detail">
      <div className="anomaly-detail__header">Latest Updates</div>
      <div className="anomaly-detail__body">
        <table className="table">
          <thead className="table__head">
            <tr data-test-id="table-header-columns">
              <th>Project Name</th>
              <th>Maximum Energy Consumption</th>
              <th>Minimum Energy Consumption</th>
            </tr>
          </thead>
          {(!isLoading && (
            <tbody data-test-id="anomaly-table-body" className="table__body">
              {data.map((datum) => {
                return (
                  <tr key={datum.name}>
                    <td headers="name-column">{datum.name}</td>
                    <td headers="max-energy-column">{datum.maxEnergyConsumption}</td>
                    <td headers="min-energy-column">{datum.minEnergyConsumption}</td>
                  </tr>
                );
              })}
            </tbody>
          )) || <ClipLoader />}
        </table>
      </div>
    </div>
  );
};

export default AnomalyDetail;
