import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findListName'
})
export class FindListNamePipe implements PipeTransform {

  transform(completList: any[], listId: number): string {
    const foundItem = completList.find(list => list.id === listId);
    return foundItem?.listName || '';
  }

}
