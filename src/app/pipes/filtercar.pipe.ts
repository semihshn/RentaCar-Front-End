import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';

@Pipe({
  name: 'filtercar'
})
export class FiltercarPipe implements PipeTransform {

  transform(value: Car[],filterText:string ): Car[] {

    return filterText
    ? value.filter(
        (p: Car) =>
          p.carName.toLocaleLowerCase().indexOf(filterText) !== -1
      )
    : value;
  }

}
