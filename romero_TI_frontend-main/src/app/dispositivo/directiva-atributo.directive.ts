import { Directive, ElementRef  } from '@angular/core';

@Directive({
  selector: '[appDirectivaAtributo]'
})
export class DirectivaAtributoDirective {
  // uso esta directiva custom de atributo para cambiar el fondo del div que contiene el texto
  // que muestra si se realizó o no registro
  constructor(private el:ElementRef) {
    el.nativeElement.style.backgroundColor='blue';
  }

}
