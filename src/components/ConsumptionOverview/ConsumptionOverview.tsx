'use client';

import * as React from 'react';

import { useAppSelector } from '@/hooks/store';

const ConsumptionOverview = () => {
  const { selectedProjects, projectEnergyConsumptionDetail } = useAppSelector((state) => ({
    selectedProjects: state.projects.selectedProjects,
    projectEnergyConsumptionDetail: state.projects.projectEnergyConsumptionDetail,
  }));

  const projectData = selectedProjects.length ? selectedProjects : projectEnergyConsumptionDetail;

  return (
    <div className="consumption-overview">
      <div className="consumption-overview__header">Consumption Overview Detail</div>
      <div className="consumption-overview__body">
        <div className="consumption-overview__info">
          <header>Total Energy Consumption</header>
          {projectData.reduce((sum, project) => sum + project.energyConsumption, 0)}
        </div>
        <div className="consumption-overview__info">
          <header>Total Cumulative Savings</header>
          {projectData.reduce((sum, project) => sum + project.energyConsumption, 0)}
        </div>
      </div>
    </div>
  );
};

export default ConsumptionOverview;
