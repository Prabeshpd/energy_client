export interface ProjectHistoryYear {
  value: number;
  time: string;
}

export interface ProjectHistoryAnomaly {
  projectId: string;
  maximumEnergyConsumption: number;
  minimumEnergyConsumption: number;
}
