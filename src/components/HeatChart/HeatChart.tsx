'use client';

import * as React from 'react';

import { MONTHS, WEEK_DAYS } from '@/constants/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import toast from '@/lib/toast';
import { fetchProjectHistoryByYear } from '@/reducers/ProjectHistory/actions';

interface HeatMapData {
  time: Date;
  value: number;
}

const HeatChart = () => {
  const dispatch = useAppDispatch();

  const { projectHistoryByYear, isLoading } = useAppSelector((state) => ({
    projectHistoryByYear: state.projectHistory.projectsHistoryByYear,
    isLoading: state.projectHistory.isLoadingFetchProjectHistoryByYear,
  }));

  const [year, setYear] = React.useState<string>('2022');

  React.useEffect(() => {
    async function dispatchFetchProjectHistory() {
      try {
        await dispatch(fetchProjectHistoryByYear(year));
      } catch (err) {
        toast('Unable to show heatmap', 'error');
      }
    }

    dispatchFetchProjectHistory();
  }, []);

  const min = Math.min(0, ...projectHistoryByYear.map((d: HeatMapData) => d.value));
  const max = Math.max(...projectHistoryByYear.map((d: HeatMapData) => d.value));
  const colorMultiplier = 1 / (max - min);

  return (
    <div className="timeline">
      <div className="timeline-months">
        {MONTHS.map((monthName) => {
          return <div className={`timeline-months-month ${monthName}`}>{monthName}</div>;
        })}
      </div>

      <div className="timeline-body">
        <div className="timeline-weekdays">
          {WEEK_DAYS.map((day) => (
            <div className="timeline-weekdays-weekday">{day}</div>
          ))}
        </div>

        <div className="timeline-cells">
          {projectHistoryByYear.map((projectHistory: HeatMapData) => {
            const alpha = colorMultiplier * projectHistory.value;
            let style = {
              backgroundColor: `rgba(3, 160, 3, ${alpha})`,
            };

            return <div className="timeline-cells-cell" style={style}></div>;
          })}
        </div>
      </div>
    </div>
  );
};

export default HeatChart;
