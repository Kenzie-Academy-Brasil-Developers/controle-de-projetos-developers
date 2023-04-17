interface IProject {
  id: number;
  name: string;
  description: string;
  estimatedTime: string;
  repository: string;
  startDate: Date;
  endDate: Date | null;
  developerId: number | null;
}

interface IProjectTechnologies {
  id: number;
  addedIn: Date;
  projectId: number;
  technologyId: number;
}

interface ITechnologies {
  id: number;
  name: string;
}

type TProjectRequest = Omit<IProject, "id">;
type TProjectTechnologiesRequest = Omit<IProjectTechnologies, "id">;

export {
  IProject,
  TProjectRequest,
  IProjectTechnologies,
  ITechnologies,
  TProjectTechnologiesRequest,
};
