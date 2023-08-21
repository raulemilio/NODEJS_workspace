import { Injectable } from '@angular/core';
import { Dispositivo } from '../model/Dispositivo';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DispositivoService {
  // url Backend
 urlApi="http://localhost:3000";

  constructor(private _http: HttpClient ) {
   }
   // función para obtener el listado de dispositivos sensores
   getListadoDispositivos():Promise<Dispositivo[]>{
    return this._http.get(this.urlApi+ "/api/dispositivo/").toPromise().then((listado:Dispositivo[])=>{
      return listado;
    });
  }

}
