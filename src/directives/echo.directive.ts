import { Directive, ElementRef, AfterViewInit, Renderer } from '@angular/core';

@Directive({selector: '[ibEcho]'})
export class EchoDirective implements AfterViewInit {

  private span: HTMLElement;

  constructor(private _elem: ElementRef, private _renderer: Renderer) {
  }

  ngAfterViewInit(): void {
    this.attachEvent();
    this.span = this._renderer.createElement(this._elem.nativeElement, 'span');
    this.span.textContent = 'Click Me';
  }

  /**
   * Attach the `click` event handler
   */
  private attachEvent(): void {
    this._renderer.listen(this._elem.nativeElement, 'click',
      () => this.span.textContent = 'Greetings from echo directive.');
  }
}
