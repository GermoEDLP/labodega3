import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[avatar]' 
})
export class AvatarDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') mouseenter(){
    console.log('sobre');
    
    this.renderer.addClass(this.elementRef.nativeElement, 'dimmer');
  }

  @HostListener('click') click(){
    console.log('sobre');
    
    this.renderer.addClass(this.elementRef.nativeElement, 'dimmer');
  }

  @HostListener('mouseleave') mouseleave(){
    console.log('afuera');
    
    this.renderer.removeClass(this.elementRef.nativeElement, 'dimmer');
  }

}
