import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';
@Directive({
  selector: '[myFocus]'
})
export class FocusDirective {
  private _defaultFocus = false;
  constructor(private el: ElementRef, private renderer: Renderer) { }
  // @Input() set defaultColor(giveFocus: boolean){
  //   this._defaultFocus = giveFocus || this._defaultFocus;
  // }
  @Input('myFocus') giveFocus: boolean;
  @HostListener('changes') ngOnChanges() {
    this.focus(this.giveFocus || this._defaultFocus);
  }  

  private focus(focused: boolean) {
    if (focused) {
      this.renderer.invokeElementMethod(this.el.nativeElement, 'focus', []);
    }
  }
}
