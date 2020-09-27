import { Pipe, PipeTransform } from '@angular/core';
import { Slider } from '../../interfaces/interfaces';

@Pipe({
  name: 'sliderShow'
})
export class SliderShowPipe implements PipeTransform {

  transform(value: Slider[]): Slider[] {
    return value.filter((slider: Slider)=> slider.show);
  }

}
