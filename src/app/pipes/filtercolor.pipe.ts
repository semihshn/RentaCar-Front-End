import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'filtercolor'
})
export class FiltercolorPipe implements PipeTransform {

  transform(value: Color[], filterText:string): Color[] {
    return filterText
    ? value.filter(
        (p: Color) =>
          p.name.toLocaleLowerCase().indexOf(filterText) !== -1
      )
    : value;
  }

}
