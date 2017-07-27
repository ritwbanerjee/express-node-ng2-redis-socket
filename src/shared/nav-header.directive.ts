
import {Directive, HostListener, ElementRef, Renderer} from '@angular/core';
declare let $: any;

// Directive decorator
@Directive({
  selector: '[fixednav]',
    host: {
        '(window:scroll)': 'onScroll()'
    }
})
  export class fixedHeadDirective {
     private originalPos = 0;
  constructor(private renderer: Renderer,
              private el: ElementRef) {
           this.originalPos = 331; 
  }
     onScroll(){
        let topPos = (document.documentElement.scrollTop || document.body.scrollTop);
         if(topPos>this.originalPos+this.el.nativeElement.offsetHeight){
          //this.el.nativeElement.className = 'default navbar-fixed';
          this.renderer.setElementClass(this.el.nativeElement, 'navbar-fixed', true);
        }else{ 
            this.el.nativeElement.className = 'default';
            this.renderer.setElementClass(this.el.nativeElement, 'navbar-fixed', null);
        }
    }
}
