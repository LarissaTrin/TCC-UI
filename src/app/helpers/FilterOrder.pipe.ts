import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FilterOrder'
})
export class FilterOrderPipe implements PipeTransform {

  transform(items: any[]): any[] {
    return items.filter((item) => item.order !== -1);
  }
}
