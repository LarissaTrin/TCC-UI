import { UserIn } from "./userIn";
import { ProjectListIn } from "./projectListIn";

export interface ProjectUserIn {
    userId: number;
    projectId: number;
    roleId: number;
    order?: number;
    project?: ProjectListIn;
    user?: UserIn;
}