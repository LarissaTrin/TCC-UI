import { ProjectListIn } from "./projectListIn";
import { CardIn } from "./cardIn";

export interface ListIn {
    id?: number;
    listName?: string;
    projectId: number;
    project?: ProjectListIn;
    order: number;
    cards?: CardIn[];
    editMode: boolean;
    editName?: string;
}