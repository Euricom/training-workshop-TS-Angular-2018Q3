import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: any, fieldName: string, expression: string): any {
    if (!value) {
      return value;
    }
    if (!Array.isArray(value)) {
      return value;
    }

    return value.filter((item) => {
      if (item[fieldName] && typeof item[fieldName] === 'string') {
        return item[fieldName].includes(expression);
      }
      return false;
    });
  }
}
