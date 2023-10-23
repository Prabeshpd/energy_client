export interface ProjectHistoryYear {
  value: number;
  time: string;
}

export interface ProjectHistoryAnomaly {
  projectId: string;
  maxEnergyConsumption: number;
  minEnergyConsumption: number;
  time: string;
}
