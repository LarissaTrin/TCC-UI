import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '@app/util/constants';


@Pipe({
  name: 'DateTimeFormat'
})
export class DateTimeFormatPipe implements PipeTransform {
  

  transform(value: any, args?: any): any {
    const dateParts = value.split(' ');
    return dateParts[0];
  }

}
