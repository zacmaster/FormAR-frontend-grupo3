import { Component, OnInit } from '@angular/core';
import { VALIDACION, LABEL, LABEL_REQUIRED} from '../../utilidades/mensajes'
import {FormControl} from '@angular/forms';
import { CursadaService } from 'src/app/servicios/cursada.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-cursadas',
  templateUrl: './cursadas.component.html',
  styleUrls: ['./cursadas.component.css']
})
export class CursadasComponent implements OnInit {

  cursoSeleccionado = new FormControl();
  instructorSeleccionado = new FormControl();
  salaSeleccionada = new FormControl();
  diasSeleccionados = new FormControl();
  cantClases: string;

  _LABEL = LABEL;
  _LABEL_R = LABEL_REQUIRED;
  busqueda;
  mostrarDialogo = false;
  cursadas = []
    // {
    //   curso: "Tapiceria",
    //   descripcion: "Curso de Tapiceria",
    //   area: "Oficio",
    //   fechaInicio: "22/09/2018",
    //   fechaFin: "22/12/2018"

    // }
  // ];

  cursos = [
    {id: '0', curso: 'curso1'},
    {id: '1', curso: 'curso2'},
    {id: '2', curso: 'curso3'}
  ];

  instructores = [
    {id: 0, nombre: 'pedro'},
    {id: 1, nombre: 'marcos'},
    {id: 2, nombre: 'sebastian'}
  ];

  salas = [
    {id: 0, sala: 100},
    {id: 1, sala: 101},
    {id: 2, sala: 102},
    {id: 3, sala: 103},   
  ];

  dias = [
    {dia: 'Domingo', id: 0},
    {dia: 'Lunes', id: 1},
    {dia: 'Martes', id: 2},
    {dia: 'Miercoles', id: 3},
    {dia: 'Jueves', id: 4},
    {dia: 'Viernes', id: 5},
    {dia: 'Sabado', id: 6}
  ];
  clickBtnIzquierdo(){

  }
  clickBtnDerecho(){
    
  }

  constructor(private _cusadaService: CursadaService,
              private _spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    console.log("on init");
    
    this._spinnerService.show();
    setTimeout(() => {
      this.cargarCursadas()
        .then(r => {
          this.cursadas = r;
          this._spinnerService.hide();
        })
    },1000)
  }

  cargarCursadas(){
    return this._cusadaService.list().toPromise();
  }

}
