'use client';

import classNames from 'classnames';

import { RealTimeProjectData } from '@/types/projects';

interface ToolTipProps {
  display: boolean;
  projectData: RealTimeProjectData[];
}

const ToolTip = (toolTipProps: ToolTipProps) => {
  const { display, projectData } = toolTipProps;

  return (
    <div
      className={classNames('project-tooltip', {
        'project-tooltip--show': display,
      })}
    >
      {projectData.map((project) => (
        <div>
          <p>District Name: {project.districtName}</p>
          <p>Project Name: {project.projectName}</p>
          <p>Energy Consumed: {project.energyConsumption}</p>
          <p>Humidity: {project.humidity}</p>
          <p>Temperature: {project.temperature}</p>
        </div>
      ))}
    </div>
  );
};

export default ToolTip;
