'use client';

import * as React from 'react';

import { geoMercator, geoPath } from 'd3';
import ClipLoader from 'react-spinners/ClipLoader';
import { useAppSelector } from '@/hooks/store';

import { useMapD3 } from './hooks';

import ToolTip from './ToolTip';

const SCALE_FACTOR = 55000;
const ROTATION_X_FACTOR = -100.6717;
const ROTATION_Y_FACTOR = -13.712;

const projection = geoMercator().scale(SCALE_FACTOR).rotate([ROTATION_X_FACTOR, ROTATION_Y_FACTOR]);
const path = geoPath(projection);

const Map = () => {
  const { selectedProjects, projectEnergyConsumptionDetail } = useAppSelector((state) => ({
    selectedProjects: state.projects.selectedProjects,
    projectEnergyConsumptionDetail: state.projects.projectEnergyConsumptionDetail,
  }));

  const projectData = selectedProjects.length ? selectedProjects : projectEnergyConsumptionDetail;
  const {
    state: { mapData, toolTipData, toolTipVisibility },
    dispatchToolTipData,
    dispatchToolTipVisibility,
  } = useMapD3();

  if (!mapData) return <ClipLoader />;

  const { districts, interiors } = mapData;

  return (
    <>
      <ToolTip display={toolTipVisibility} projectData={toolTipData} />
      <svg xmlns="http://www.w3.org/2000/svg" className="map-canvas">
        <g className="marks">
          {districts.features.map((feature: any) => {
            const districtProperties = projectData.filter(
              (project) => project.districtName === feature.properties.dname_e
            );
            return (
              <>
                <path
                  key={feature.properties.dcode}
                  className="land"
                  id={feature.properties.dname_e}
                  d={path(feature) ?? ''}
                />
                {districtProperties.map((property) => (
                  <path
                    key={property.projectName}
                    className="property"
                    d={path(feature) ?? ''}
                    onMouseOver={() => {
                      dispatchToolTipData(districtProperties);
                      dispatchToolTipVisibility(true);
                    }}
                    onMouseOut={() => {
                      dispatchToolTipData([]);
                      dispatchToolTipVisibility(false);
                    }}
                  />
                ))}
              </>
            );
          })}
          <path className="interiors" d={path(interiors) ?? ''} />
        </g>
      </svg>
    </>
  );
};

export default Map;
