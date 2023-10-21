export interface ProjectHistoryYear {
  projectId: string;
  energyConsumption: number;
  time: string;
}

export interface ProjectHistoryAnomaly {
  projectId: string;
  maxEnergyConsumption: number;
  minEnergyConsumption: number;
}
