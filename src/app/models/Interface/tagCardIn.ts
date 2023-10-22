import { CardIn } from "./cardIn";
import { TagsIn } from "./tagsIn";

export interface TagCardIn {
    cardId: number;
    card?: CardIn;
    tagId: number;
    tags?: TagsIn;
}