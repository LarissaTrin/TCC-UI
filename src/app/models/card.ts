import { ApproverIn } from "./Interface/approverIn";
import { CommentsIn } from "./Interface/commentsIn";
import { TagCardIn } from "./Interface/tagCardIn";
import { TaskProjectIn } from "./Interface/taskProjectIn";
import { UserIn } from "./Interface/userIn";

export class Card {
  constructor(
    id?: number,
    cardName?: string | null,
    userId?: number | null,
    listId?: number | null,
    date?: Date | null,
    priority?: number | null,
    description?: string | null,
    plannedHours?: Date | null,
    completedHours?: Date | null,
    storyPoints?: number | null,
    tasksProject?: TaskProjectIn[],
    tagCards?: TagCardIn[],
    comments?: CommentsIn[],
    approvers?: ApproverIn[],
  ) {
    this.id = id ?? 0;
    this.cardName = cardName ? cardName : null;
    this.listId = listId ?? 0;
    this.userId = userId ? userId : null;
    this.priority = priority ? priority : null;
    this.date = date ? date : null;
    this.description = description ? description : null;
    this.plannedHours = plannedHours ? plannedHours : null;
    this.completedHours = completedHours ? completedHours : null;
    this.storyPoints = storyPoints ? storyPoints : null;
    this.tasksProject = tasksProject;
    this.tagCards = tagCards;
    this.comments = comments;
    this.approvers = approvers;
  }

  // ids para rastreio melhor test

  id?: number;
  cardName?: string | null;
  listId: number;
  userId?: number | null;
  user?: UserIn;
  priority?: number | null;
  date?: Date | null;
  description?: string | null;
  plannedHours?: Date | null;
  completedHours?: Date | null;
  storyPoints?: number | null;
  tasksProject?: TaskProjectIn[];
  tagCards?: TagCardIn[];
  comments?: CommentsIn[];
  approvers?: ApproverIn[];
}
