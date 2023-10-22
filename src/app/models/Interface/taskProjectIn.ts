import { CardIn } from "./cardIn";
import { UserIn } from "./userIn";

export interface TaskProjectIn {
    id: number;
    taskName?: string;
    userId?: number;
    user?: UserIn;
    date?: Date;
    completed: boolean;
    cardId: number;
    card?: CardIn;
}