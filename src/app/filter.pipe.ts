import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterText, propName, prp): any {

    if (value.length === 0) {
      return value
    }
    let searcResult = (filterText) ?
      value.filter(item =>
        item[propName].toLowerCase().includes(filterText.toLowerCase()) || item[prp].toLowerCase().includes(filterText.toLowerCase())) :
      value;
    return searcResult;
  }



}
