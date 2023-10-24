export interface Project {
  id: string;
  userId: string;
  projectName: string;
}

export interface RealTimeProjectData extends Project {
  coordinates: string;
  districtName: string;
  energyConsumption: number;
  humidity: number;
  temperature: number;
}

export default Project;
