import { ProjectUserIn } from "./projectUserIn";
import { ListIn } from "./listIn";
import { TagsIn } from "./tagsIn";

export interface ProjectListIn {
    id: number; 
    projectName?: string;
    description?: string;
    lists?: ListIn[]; 
    projectUsers: ProjectUserIn[];
    tags?: TagsIn[];
    userId: number;
}