import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, fieldName: any, filter: any) {
    if (!value || !filter) {
      return value;
    }
    if (!Array.isArray(value)) {
      return value;
    }

    return value.filter((item) => {
      if (!item[fieldName]) {
        return false;
      }

      const match = item[fieldName].includes(filter);
      return match;
    });
  }
}
