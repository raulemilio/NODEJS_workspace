import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Medicion } from '../model/Medicion';

@Injectable({
  providedIn: 'root'
})
export class MedicionService {
  // urlBackend
  urlApi="http://localhost:3000";

  constructor(private _http: HttpClient ) {
   }
  // función para obtener la última medición por id de dispositivo
  getMedicionByIdDispositivo(id):Promise<Medicion>{
    return this._http.get(this.urlApi+"/api/medicion/"+id).toPromise().then((med:Medicion)=>{
      return med;
    });
  };
  // función para obtener el listado de mediciones id de dispositivo
  getMedicionesByIdDispositivo(id):Promise<Medicion[]>{
    return this._http.get(this.urlApi+"/api/medicion/"+id+"/todas").toPromise().then((mediciones:Medicion[])=>{
      return mediciones;
    });
  };
  // función para agregar una medición a un dispositivo particular (id)
  agregarMedicion(medicion:Medicion){

    var body ={
      fecha:medicion.fecha,
      valor: medicion.valor,
      dispositivoId:medicion.dispositivoId
    };
      return this._http.post(this.urlApi+"/api/medicion/agregar",body).toPromise().then((result)=>{
      return result;
    });
  }
}
