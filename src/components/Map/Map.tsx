import * as React from 'react';

import { useMapD3 } from './hooks';
import Mark from './Mark';

const Map = () => {
  const data = useMapD3();
  if (!data) return <pre>Loading...</pre>;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="map-canvas">
      <Mark data={data} />
    </svg>
  );
};

export default Map;
