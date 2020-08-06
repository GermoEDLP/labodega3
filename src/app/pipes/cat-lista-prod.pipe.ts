import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../interfaces/interfaces';

@Pipe({
  name: 'cats',
})
export class CatListaProdPipe implements PipeTransform {
  transform(value: string, arg: Category[]) {
    if (value.includes('subs')) {
      let parts = value.split('subs');
      return arg.find((cat) => cat.id == parts[0]).subs[parts[1]];
    } else {
      return arg.find((cat) => cat.id == value).name;
    }
  }
}
