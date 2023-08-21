import { Component } from '@angular/core';
import { DispositivoService } from '../services/dispositivo.service';
import { Dispositivo } from '../model/Dispositivo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  listadoDispositivo:Dispositivo[];

  constructor(public dispositivoServ:DispositivoService) {
    // Se solicita a la Backend el listado de dispositivos disponibles en la BD
    this.dispService();
  }
  // función para solicitar al Backend el listado de dispositivos
  async dispService(){
    let listado= await this.dispositivoServ.getListadoDispositivos();
    this.listadoDispositivo=listado;
  }
}
