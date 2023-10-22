import { UserIn } from "./userIn";

export interface ApproverIn {
    id: number;
    environment?: string;
    userId?: number;
    user?: UserIn;
    cardId: number;
    order?: number;
}