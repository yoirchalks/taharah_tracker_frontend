import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  output,
} from '@angular/core';

@Directive({
  selector: '[clickOut]',
})
export class ClickOutDirective {
  clickOut = output<Event>();
  elementRef = inject(ElementRef);

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      console.log('Click outside detected');

      this.clickOut.emit(event);
    }
  }
}
