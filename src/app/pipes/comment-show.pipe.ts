import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../interfaces/interfaces';

@Pipe({
  name: 'commentShow'
})
export class CommentShowPipe implements PipeTransform {

  transform(value: Comment[]): Comment[] {
    return value.filter((comm: Comment)=> !comm.show);
  }

}
