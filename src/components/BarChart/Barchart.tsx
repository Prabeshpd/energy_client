import * as React from 'react';

import { scaleBand, ScaleBand, scaleLinear, ScaleLinear } from 'd3-scale';
import { select, axisBottom, axisLeft } from 'd3';

import { useAppSelector } from '@/hooks/store';

const { useRef, useEffect } = React;

interface AxisBottomProps {
  scale: ScaleBand<string>;
  transform: string;
}

interface AxisLeftProps {
  scale: ScaleLinear<number, number, never>;
}

const AxisBottom = ({ scale, transform }: AxisBottomProps) => {
  const ref = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} color="white" />;
};

const AxisLeft = ({ scale }: AxisLeftProps) => {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} color="white" />;
};

const BarChart = () => {
  const { projectEnergyConsumptionDetail, selectedProjects } = useAppSelector((state) => ({
    projectEnergyConsumptionDetail: state.projects.projectEnergyConsumptionDetail,
    selectedProjects: state.projects.selectedProjects,
  }));

  const projectData = selectedProjects.length ? selectedProjects : projectEnergyConsumptionDetail;
  const chartData = projectData.map((data) => ({
    label: data.projectName,
    value: data.energyConsumption,
  }));

  const margin = { top: 10, right: 0, bottom: 20, left: 30 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const scaleX = scaleBand()
    .domain(chartData.map(({ label }) => label))
    .range([0, width])
    .padding(0.5);

  const scaleY = scaleLinear()
    .domain([0, Math.max(...chartData.map(({ value }) => value)) + 5])
    .range([height, 0]);

  return (
    <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        <AxisLeft scale={scaleY} />
        {chartData.map(({ value, label }) => (
          <>
            <rect
              key={`bar-${label}`}
              x={scaleX(label)}
              y={scaleY(value)}
              width={scaleX.bandwidth()}
              height={height - scaleY(value)}
              fill="black"
            />
            <text
              x={(scaleX(label) ?? 0) + 5}
              y={scaleY(value) - 5}
              fill="white"
              fontSize={'0.8rem'}
            >
              {value} kw
            </text>
          </>
        ))}
      </g>
    </svg>
  );
};

export default BarChart;
