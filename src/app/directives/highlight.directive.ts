import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges {
  @Input() hightlightText = '';
  originalHTML = '';
  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { currentValue, firstChange } = changes['hightlightText'];
    if (firstChange) {
      this.originalHTML = this.el.nativeElement.innerHTML;
      return;
    }
    if (currentValue) {
      const regexp = new RegExp(`(${currentValue})`, 'gi');
      this.el.nativeElement.innerHTML = this.originalHTML.replace(
        regexp,
        `<span style="background-color:yellow"> \$1</span>`
      );
    } else {
      this.el.nativeElement.innerHTML = this.originalHTML;
    }
  }
}
