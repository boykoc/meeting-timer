import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
@Directive({
  selector: '[myFocus]'
})
export class FocusDirective {
  private _defaultFocus = false;
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @Input('myFocus') giveFocus: boolean;
  @HostListener('changes') ngOnChanges() {
    this.focus(this.giveFocus || this._defaultFocus);
  }  

  private focus(focused: boolean) {
    if (focused) {
      let cursor_position = this.el.nativeElement.value.length;
      this.el.nativeElement.focus();
      // Ensure cursor position is at end of input.
      this.el.nativeElement.setSelectionRange(cursor_position, cursor_position);
    }
  }
}
