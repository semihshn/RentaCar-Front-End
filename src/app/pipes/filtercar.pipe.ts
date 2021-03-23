import { Pipe, PipeTransform } from '@angular/core';
import { Car } from '../models/car';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'filtercar'
})
export class FiltercarPipe implements PipeTransform {

  transform(value: CarDetail[],filterText:string ): CarDetail[] {

    return filterText
    ? value.filter(
        (p: CarDetail) =>
          p.carName.toLocaleLowerCase().indexOf(filterText) !== -1
      )
    : value;
  }

}
