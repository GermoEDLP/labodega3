import { Pipe, PipeTransform, OnInit } from '@angular/core';
import { CatsService } from '../services/cats.service';
import { Category } from '../interfaces/interfaces';
import { async } from 'rxjs/internal/scheduler/async';

@Pipe({
  name: 'cats',
})
export class CatListaProdPipe implements PipeTransform {
  transform(value: string, arg: any) {
    if (value.includes('subs')) {
      let parts = value.split('subs');
      return arg.find((cat) => cat.id == parts[0]).subs[parts[1]];
    } else {
      return arg.find((cat) => cat.id == value).name;
    }
  }
}
