import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'unidadMedicion'
})
export class UnidadMedicionPipe implements PipeTransform {
  public salida:String="";
 // uso este pipe para agregar la unidad al valor medido
  transform(value: number): string {
    return this.salida=value +" °C";
  }

}
