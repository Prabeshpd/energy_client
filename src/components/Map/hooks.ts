import { useReducer, useEffect, useState } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

export const useMapD3 = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    json('http://localhost:3001/charts/maps')
      .then((data: any) => {
        const { district } = data.objects;
        setData({
          districts: feature(data, district),
          interiors: mesh(data, district, (a, b) => a !== b),
        });
      })
      .catch((err) => console.log(err));
  }, []);

  return data;
};
