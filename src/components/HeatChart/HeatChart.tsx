'use client';

import * as React from 'react';

import { MONTHS, WEEK_DAYS } from '@/constants/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import toast from '@/lib/toast';
import { fetchProjectHistoryByYear } from '@/reducers/ProjectHistory/actions';
import ClipLoader from 'react-spinners/ClipLoader';

interface HeatMapData {
  time: string;
  value: number;
}

const HeatChart = () => {
  const dispatch = useAppDispatch();

  const { projectHistoryByYear, isLoading, selectedProject } = useAppSelector((state) => ({
    projectHistoryByYear: state.projectHistory.projectsHistoryByYear,
    isLoading: state.projectHistory.isLoadingFetchProjectHistoryByYear,
    selectedProject: state.projects.selectedProjects,
  }));

  const [year, setYear] = React.useState<string>('2022');

  React.useEffect(() => {
    async function dispatchFetchProjectHistory() {
      try {
        const projectIds = selectedProject.map((project) => project.id);
        await dispatch(fetchProjectHistoryByYear({ year, projectIds }));
      } catch (err) {
        toast('Unable to show heatmap', 'error');
      }
    }

    dispatchFetchProjectHistory();
  }, [selectedProject]);

  const min = Math.min(0, ...projectHistoryByYear.map((d: HeatMapData) => d.value));
  const max = Math.max(...projectHistoryByYear.map((d: HeatMapData) => d.value));
  const colorMultiplier = 1 / (max - min);

  return (
    <div className="heat-map">
      <div className="heat-map__header">Data Plant Efficiency KPI</div>
      <div className="heat-map__body">
        {(!isLoading && (
          <div className="timeline">
            <div className="timeline-months">
              {MONTHS.map((monthName) => {
                return (
                  <div key={monthName} className={`timeline-months-month ${monthName}`}>
                    {monthName}
                  </div>
                );
              })}
            </div>

            <div className="timeline-body">
              <div className="timeline-weekdays">
                {WEEK_DAYS.map((day) => (
                  <div key={day} className="timeline-weekdays-weekday">
                    {day}
                  </div>
                ))}
              </div>

              <div className="timeline-cells">
                {projectHistoryByYear.map((projectHistory: HeatMapData) => {
                  const alpha = colorMultiplier * projectHistory.value;
                  let style = {
                    backgroundColor: `rgba(3, 160, 3, ${alpha})`,
                  };

                  return (
                    <div
                      key={projectHistory.time}
                      className="timeline-cells-cell"
                      style={style}
                    ></div>
                  );
                })}
              </div>
            </div>
          </div>
        )) || <ClipLoader />}
      </div>
    </div>
  );
};

export default HeatChart;
