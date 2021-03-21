import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../models/brand';

@Pipe({
  name: 'filterbrand'
})
export class FilterbrandPipe implements PipeTransform {

  transform(value: Brand[], filterText:string): Brand[] {
    return filterText
    ? value.filter(
        (p: Brand) =>
          p.name.toLocaleLowerCase().indexOf(filterText) !== -1
      )
    : value;
  }

}
