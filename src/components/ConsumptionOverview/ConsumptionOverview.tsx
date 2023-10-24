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
        <div className="consumption-overview__info" data-test-id="consumption-overview-energy">
          <header>Total Energy Consumption</header>
          <p>{projectData.reduce((sum, project) => sum + project.energyConsumption, 0)} kw</p>
        </div>
        <div className="consumption-overview__info" data-test-id="consumption-overview-saving">
          <header>Total Cumulative Savings</header>
          <p>{projectData.reduce((sum, project) => sum + project.energyConsumption, 0)} kw</p>
        </div>
      </div>
    </div>
  );
};

export default ConsumptionOverview;
