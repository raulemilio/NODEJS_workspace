import { Component, OnInit} from '@angular/core';
import { MedicionService } from '../services/medicion.service';
import { Medicion } from '../model/Medicion';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.page.html',
  styleUrls: ['./medicion.page.scss'],
})
export class MedicionPage{

    listadoMediciones:Medicion[]; // listado de mediciones para un dispositivo
    public idDispositivo:string;

    constructor(private router:ActivatedRoute, public medicionServ:MedicionService) {
      // para un dispositivo id se solicita al backend el listado de mediciones almacenados en BD
      this.idDispositivo = this.router.snapshot.paramMap.get('id');
      this.medService();
    }
    // Función que solicita al backend el listado de mediciones para un dispositivo
    async medService(){
      let mediciones= await this.medicionServ.getMedicionesByIdDispositivo(this.idDispositivo);
      this.listadoMediciones=mediciones;
    }
}
