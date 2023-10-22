import { CardIn } from './Interface/cardIn';
import { ProjectListIn } from './Interface/projectListIn';
import { Card } from './card';

export class Lista {
  constructor(listName: string, order: number, projectId: number, editMode: boolean) {
    this.listName = listName;
    this.order = order;
    this.projectId = projectId;
    this.editMode = editMode ? editMode : false;
  }

  id?: number;
  listName?: string;
  projectId: number;
  project?: ProjectListIn;
  order: number;
  cards?: CardIn[];
  editMode: boolean;
  editName?: string;
}
