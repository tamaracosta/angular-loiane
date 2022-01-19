import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  @HostBinding('style.backgroundColor') backgroundColor: string = '';

  @HostListener('mouseenter') onMouseEnter() {
    this.backgroundColor = this.highlightColor
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = this.defaultColor
  }

  @Input('highlight') highlightColor: string = "gray";//dar um nome com o mesmo nome do seletor, reduz o código lá no input properties, no html.
  @Input() defaultColor: string = "purple";

  constructor() {
  }

  ngOnInit() {
    this.backgroundColor = this.defaultColor// fez que navegador já abrisse na cor padrão verde que coloquei no html
  }
}
