import { Component, OnInit} from '@angular/core';
import { LogService } from '../services/log.service';
import { Log } from '../model/Log';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-log',
  templateUrl: './log.page.html',
  styleUrls: ['./log.page.scss'],
})
export class LogPage{

  listadoLog:Log[]; // listado de log para una electroválvula
  public idDispositivo:string;

  constructor(private router:ActivatedRoute, public logServ:LogService) {
    // Solicitamos al BackEnd el listado de log para un dispositivo (id)
    this.idDispositivo = this.router.snapshot.paramMap.get('id');
    this.logService();
  }
 // función para solicitar al Backend el listado de log para un dispositivo
  async logService(){
    let logs= await this.logServ.getListadoLogByIdDispositivo(this.idDispositivo);
    this.listadoLog=logs;
  }

}
