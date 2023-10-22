export interface ProjectHistoryYear {
  value: number;
  time: Date;
}

export interface ProjectHistoryAnomaly {
  projectId: string;
  maxEnergyConsumption: number;
  minEnergyConsumption: number;
}
