import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmlDecoder'
})
export class HtmlDecoderPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
