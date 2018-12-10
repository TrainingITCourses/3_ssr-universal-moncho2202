import { Agency } from "./agency";
import { MissionType } from "./mission-type";
import { Status } from "./status";

export interface SearchValues {
  agencies: Agency[];
  types: MissionType[];
  status: Status [];
}
