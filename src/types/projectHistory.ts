export interface ProjectHistoryYear {
  value: number;
  time: string;
}

export interface ProjectHistoryAnomaly {
  projectId: string;
  maximumEnergyConsumption: number;
  minimumEnergyConsumption: number;
}

export interface ProjectHistoryYearRequest {
  year: string;
  projectIds?: string[];
}

export interface ProjectHistoryAnomalyRequest {
  projectIds?: string[];
}
