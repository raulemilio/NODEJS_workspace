import { Injectable } from '@angular/core';
import { Log } from '../model/Log';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  // urlBackend
 urlApi="http://localhost:3000";

  constructor(private _http: HttpClient ) {
   }
  // función para obtener el listado de logs por id de dispositivo
  getListadoLogByIdDispositivo(id):Promise<Log[]>{
    return this._http.get(this.urlApi+"/api/log/"+id+"/todas").toPromise().then((listadoLog:Log[])=>{
      return listadoLog;
    });
  };
  // función para obtener la última medición por id de dispositivo
  getLogByIdDispositivo(id):Promise<Log>{
    return this._http.get(this.urlApi+"/api/log/"+id).toPromise().then((medLog:Log)=>{
      return medLog;
    });
  };
// función para agregar un log (por apertura o cierre de electroválvula) a un dispositivo particular (id)
  agregarLog(log:Log){

    var body ={
      apertura: log.apertura,
      fecha:log.fecha,
      electrovalvulaId:log.electrovalvulaId
    };
      return this._http.post(this.urlApi+"/api/log/agregar",body).toPromise().then((result)=>{
      return result;
    });
  }

}
