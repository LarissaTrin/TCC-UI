import { ProjectListIn } from "./projectListIn";

export interface TagsIn {
    id: number;
    tagName?: string;
    projectId: number;
    project?: ProjectListIn;
}