import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo',
})
export class YesNoPipe implements PipeTransform {
  transform(value: any): any {
    if (value) {
      return 'No';
    }
    return 'Yes';
  }
}
