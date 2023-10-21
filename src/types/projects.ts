export interface Project {
  id: string;
  userId: string;
  projectName: string;
}

export interface RealTimeProjectData extends Project {
  coordinates: [number, number];
  districtName: string;
  energyConsumption: number;
}

export default Project;
