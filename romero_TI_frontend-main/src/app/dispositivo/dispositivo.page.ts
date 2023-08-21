import { Component} from '@angular/core';
import * as Highcharts from 'highcharts';
import { Medicion } from '../model/Medicion';
import { Log } from '../model/Log';
import { MedicionService } from '../services/medicion.service';
import { LogService } from '../services/log.service';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
declare var require: any;


require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);

@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})

export class DispositivoPage {

  public medicion:Medicion; // objeto de Class Medición para almacenar los datos correspondientes a las mediciones
  public log:Log; // objeto de Class Log para almacenar los datos correspondientes a los log
  public idDispositivo:string;

  public estado:boolean=false; // variables auxiliares para notificar al usuario si se registro o no log o medición
  public estado1:boolean=false;
  public estado2:boolean=false;

  private valorObtenido:number;// variables auxiliares para graficar el valor en Chart
  public myChart;
  private chartOptions;

  constructor(private router:ActivatedRoute, private medicionServ:MedicionService,private logServ:LogService) {
    // cuando se llama al constructor se recupera el id del dispositivo y se pide al backend
    // la última medición y el último log de Electroválvula
    this.idDispositivo = this.router.snapshot.paramMap.get('id');
    this.getUltimaMedicion();
    this.getUltimoLog();
  }
  // Función asincrona que permite obtener la última medición registrada en la DB
  async getUltimaMedicion(){
    let ultimaMedicion= await this.medicionServ.getMedicionByIdDispositivo(this.idDispositivo);
    this.medicion=ultimaMedicion;
    this.valorObtenido=Math.floor(this.medicion.valor);
    this.generarChart();
  };
  // Función asincrona que permite obtener el último log registrado en la DB
  async getUltimoLog(){
    let ultimoLog= await this.logServ.getLogByIdDispositivo(this.idDispositivo);
    this.log=ultimoLog;
      if(this.log.apertura==1){
        this.estado=true;
      }
  };
  // cada vez que se presiona el botón ABRIR-CERRAR ELECTROVÁLVULA se llama a esta función
  // esta función permite según el caso agregar una medición y un log a la BD
  async registrarMedicionLog(){
    // obtener el nombre del mes, día del mes, año, hora
      //let now = moment().format("YYYY-MM-DD HH:mm:ss");
      // solamente agregamos una medición si la electroválvula para a estado CERRADO
      if(this.log.apertura==0){
        this.log.apertura=1;
        this.estado=true;
        this.estado1=true;
        this.estado2=false;
        //this.medicion.fecha = now;
        this.medicion.valor=1;
        await this.medicionServ.agregarMedicion(this.medicion);
      }else{
        this.log.apertura=0;
        this.estado=false;
        this.estado1=false;
        this.estado2=true;
      }
      //this.log.fecha=now;
      //this.log.electrovalvulaId=parseInt(this.idDispositivo, 10);
      // independientemente de que la electroválvula se abra o se cierra se registra un log
      //await this.logServ.agregarLog(this.log);
  }
  // esta función permite graficar el valor en un plotChart
  generarChart() {
    this.chartOptions={
      chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false
        }
        ,title: {
          text: ''
        }

        ,credits:{enabled:false}


        ,pane: {
            startAngle: -150,
            endAngle: 150
        }
        // the value axis
      ,yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
            step: 2,
            rotation: 'auto'
        },
        title: {
            text: '°C'
        },
        plotBands: [{
            from: 0,
            to: 10,
            color: '#55BF3B' // green
        }, {
            from: 10,
            to: 30,
            color: '#DDDF0D' // yellow
        }, {
            from: 30,
            to: 100,
            color: '#DF5353' // red
        }]
    }
    ,

    series: [{
        name: 'Temperatura',
        data: [this.valorObtenido],
        tooltip: {
            valueSuffix: ' °C'
        }
    }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions );
  }
}
