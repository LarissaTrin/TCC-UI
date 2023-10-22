import { ApproverIn } from "./approverIn";
import { TagCardIn } from "./tagCardIn";
import { CommentsIn } from "./commentsIn";
import { TaskProjectIn } from "./taskProjectIn";
import { UserIn } from "./userIn";

export interface CardIn {
    id?: number;
    cardName?: string | null;
    userId?: number | null;
    user?: UserIn;
    listId: number;
    date?: Date | null;
    priority?: number | null;
    description?: string | null;
    plannedHours?: Date | null;
    completedHours?: Date | null;
    storyPoints?: number | null;
    tagCards?: TagCardIn[];
    comments?: CommentsIn[];
    approvers?: ApproverIn[];
    tasksProject?: TaskProjectIn[];
  }
  