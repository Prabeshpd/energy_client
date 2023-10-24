import { useEffect, useState, useReducer } from 'react';
import { json } from 'd3';
import { feature, mesh } from 'topojson';

import config from '@/config/config';
import toast from '@/lib/toast';
import { RealTimeProjectData } from '@/types/projects';

interface Action<T, P = {}> {
  type: T;
  payload: P;
}

interface MapState {
  mapData: any;
  toolTipVisibility: boolean;
  toolTipData: RealTimeProjectData[];
}

const SET_MAP_DATA = 'SET_MAP_DATA';
type SET_MAP_DATA = typeof SET_MAP_DATA;

const SET_TOOL_TIP_VISIBILITY = 'SET_TOOL_TIP_VISIBILITY';
type SET_TOOL_TIP_VISIBILITY = typeof SET_TOOL_TIP_VISIBILITY;

const SET_TOOL_TIP_DATA = 'SET_TOOL_TIP_DATA';
type SET_TOOL_TIP_DATA = typeof SET_TOOL_TIP_DATA;

type setMapData = Action<SET_MAP_DATA, any>;
type setToolTipVisibility = Action<SET_TOOL_TIP_VISIBILITY, boolean>;
type setToolTipData = Action<SET_TOOL_TIP_DATA, RealTimeProjectData[]>;
type MapActions = setMapData | setToolTipVisibility | setToolTipData;

export const useMapD3 = () => {
  let [state, dispatch] = useReducer(
    (state: MapState, action: MapActions) => {
      switch (action.type) {
        case SET_MAP_DATA:
          return {
            ...state,
            mapData: action.payload,
          };
        case SET_TOOL_TIP_VISIBILITY:
          return { ...state, toolTipVisibility: action.payload };

        case SET_TOOL_TIP_DATA:
          return { ...state, toolTipData: action.payload };

        default:
          return { mapData: [], toolTipVisibility: false, toolTipData: [] };
      }
    },
    {
      mapData: null,
      toolTipVisibility: false,
      toolTipData: [],
    }
  );

  const dispatchToolTipVisibility = (visibility: boolean) => {
    dispatch({ type: SET_TOOL_TIP_VISIBILITY, payload: visibility });
  };

  const dispatchToolTipData = (data: RealTimeProjectData[]) => {
    dispatch({ type: SET_TOOL_TIP_DATA, payload: data });
  };

  useEffect(() => {
    json(`${config.apiBaseUrl}/charts/maps`)
      .then((data: any) => {
        const { district } = data.objects;
        dispatch({
          type: 'SET_MAP_DATA',
          payload: {
            districts: feature(data, district),
            interiors: mesh(data, district, (a, b) => a !== b),
          },
        });
      })
      .catch((_err) => toast('Unable to fetch the map', 'error'));
  }, []);

  return { state, dispatchToolTipData, dispatchToolTipVisibility };
};
