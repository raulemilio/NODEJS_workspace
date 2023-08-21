import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'estadoElectrovalvula'
})
export class EstadoElectrovalvulaPipe implements PipeTransform {
  public salida:string ="";

  transform(value:number): String {

    if(value==1){
      this.salida="Cerrada";
    }
    if(value==0){
      this.salida="Abierta";
    }
    return this.salida;
  }

}
