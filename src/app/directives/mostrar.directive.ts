import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[mostrar]'
})
export class MostrarDirective {

  constructor(el: ElementRef) {
    el.nativeElement.style.display = 'block';
  }

}
