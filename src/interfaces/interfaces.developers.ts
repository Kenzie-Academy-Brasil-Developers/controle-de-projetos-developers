interface IDevelopers {
  id: number;
  name: string;
  email: string;
}

interface IDevelopersInfo {
  id: number;
  developerSince: Date;
  preferredOS: "Windows" | "Linux" | "MacOs";
  developerId: number;
}

type TDevelopersRequest = Omit<IDevelopers, "id">;

type TDevelopersInfoRequest = Omit<IDevelopersInfo, "id">;

export {
  TDevelopersRequest,
  IDevelopers,
  IDevelopersInfo,
  TDevelopersInfoRequest,
};
