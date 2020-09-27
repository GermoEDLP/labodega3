import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../../interfaces/interfaces';

@Pipe({
  name: 'commentShow',
})
export class CommentShowPipe implements PipeTransform {
  transform(
    value: Comment[],
    arg: boolean,
    cant?: boolean
  ): Comment[] | number {
    if (cant) {
      return value.filter((comm: Comment) => comm.show == arg).length;
    } else {
      return value.filter((comm: Comment) => comm.show == arg);
    } 
  }
  //Cometario de prueba
}
