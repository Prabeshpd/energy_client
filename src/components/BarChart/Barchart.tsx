import * as React from 'react';

import { scaleBand, ScaleBand, scaleLinear, ScaleLinear } from 'd3-scale';
import { select, axisBottom, axisLeft } from 'd3';

const { useRef, useEffect } = React;

interface Data {
  label: string;
  value: number;
}

interface BarChartProps {
  data: Data[];
}

interface AxisBottomProps {
  scale: ScaleBand<string>;
  transform: string;
}

interface AxisLeftProps {
  scale: ScaleLinear<number, number, never>;
}

interface BarsProps {
  data: BarChartProps['data'];
  height: number;
  scaleX: AxisBottomProps['scale'];
  scaleY: AxisLeftProps['scale'];
}

function AxisBottom({ scale, transform }: AxisBottomProps) {
  const ref = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisBottom(scale));
    }
  }, [scale]);

  return <g ref={ref} transform={transform} color="black" />;
}

function AxisLeft({ scale }: AxisLeftProps) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (ref.current) {
      select(ref.current).call(axisLeft(scale));
    }
  }, [scale]);

  return <g ref={ref} color="black" />;
}

function Bars({ data, height, scaleX, scaleY }: BarsProps) {
  return (
    <>
      {data.map(({ value, label }) => (
        <rect
          key={`bar-${label}`}
          x={scaleX(label)}
          y={scaleY(value)}
          width={scaleX.bandwidth()}
          height={height - scaleY(value)}
          fill="black"
        />
      ))}
    </>
  );
}

function BarChart({ data }: BarChartProps) {
  const margin = { top: 0, right: 0, bottom: 0, left: 0 };
  const width = 500 - margin.left - margin.right;
  const height = 300 - margin.top - margin.bottom;

  const scaleX = scaleBand()
    .domain(data.map(({ label }) => label))
    .range([0, width])
    .padding(0.5);

  const scaleY = scaleLinear()
    .domain([0, Math.max(...data.map(({ value }) => value))])
    .range([height, 0]);

  return (
    <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
        <AxisLeft scale={scaleY} />
        <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} />
      </g>
    </svg>
  );
}

export default BarChart;
