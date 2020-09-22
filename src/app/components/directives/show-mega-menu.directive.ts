import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[showMegaMenu]',
})
export class ShowMegaMenuDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') mouseenter(){
    this.renderer.addClass(this.elementRef.nativeElement, 'show');
  }

  @HostListener('mouseleave') mouseleave(){
    this.renderer.removeClass(this.elementRef.nativeElement, 'show');
  }


}
