'use client';

import * as React from 'react';
import { geoMercator, geoPath } from 'd3';

const projection = geoMercator().scale(50000).rotate([-100.5718, -13.73]);
const path = geoPath(projection);

const Marks = ({ data }: { data: any }) => {
  const { districts, interiors } = data;

  return (
    <g className="marks">
      {districts.features.map((feature: any) => (
        <path key={feature.properties.dcode} className="land" d={path(feature) ?? ''} />
      ))}
      <path className="interiors" d={path(interiors) ?? ''} />
    </g>
  );
};

export default Marks;
