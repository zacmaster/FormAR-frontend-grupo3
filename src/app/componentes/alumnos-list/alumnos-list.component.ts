import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Alumno } from '../../modelos/alumno';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PATTERNS } from '../../utilidades/patterns';
import { VALIDACION, LABEL, LABEL_REQUIRED } from '../../utilidades/mensajes';
import { Util } from '../../utilidades/util';

import { AlumnoService } from '../../servicios/alumno.service';
import { GLOBAL } from '../../servicios/global';
import {DatepickerOptions} from 'ng2-datepicker';
import * as esLocale from 'date-fns/locale/es';
import { CursadaService } from 'src/app/servicios/cursada.service';
import { Cursada } from 'src/app/modelos/cursada';
import { InscripcionService } from 'src/app/servicios/inscripcion.service';
import { Inscripcion } from 'src/app/modelos/inscripcion';
import { PagoService } from 'src/app/servicios/pago.service';
import { Pago } from 'src/app/modelos/pago';
import * as jspdf from 'jspdf'; 
import html2canvas from 'html2canvas';

@Component({
  selector: 'alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent implements OnInit {

  dateNac;
  options: DatepickerOptions = {
    minYear: 1970,
    maxYear: 2000,
    displayFormat: 'DD[-]MM[-]YYYY',
    barTitleFormat: 'MMMM YYYY',
    dayNamesFormat: 'dd',
    firstCalendarDay: 1,
    locale: esLocale,
    barTitleIfEmpty: 'Click to select a date',
    placeholder: 'Click to select a date', 
    addClass: 'form-control', 
    addStyle: {}, 
    fieldId: 'my-date-picker', 
    useEmptyBarTitle: false,
  };

// EJEMPLO DE PDF

@ViewChild('content') content: ElementRef;
public captureScreen() {  
  let doc = new jspdf();
  let specialElementHandlers = {
    '#editor': function(elemento, renderer) {
      return true;
    }
  };

  let content = this.content.nativeElement;

  doc.fromHTML(content.innerHTML, 15, 15, {
    'width':190,
    'elementHandlers': specialElementHandlers
  });
  doc.save('test.pdf');
}  

// FIN PDF
  




  public alumnos = [];
  public cursadas = [];
  public edicion: boolean = false;

  pagosAlumno;
  alumnoTienePagos: boolean = false;

  mostrarDialogoAB = false;
  mostrarDialogoBorrar: boolean = false;
  mostrarPagosInicio: boolean = false;
  mostrarPagosPagar: boolean = false;
  alumnoSeleccionado: Alumno = new Alumno();
  pagoSeleccionado: Pago = new Pago();
  cursadaSeleccionada: Cursada = new Cursada();
  nombreAlumno: string = '';
  busqueda: string = "";
  cursadasAlumnos;
  cursadasFiltradas: Cursada[];
  selectedCursada: Cursada = new Cursada();
  inscripcionShowed: boolean = false;
  cursadasAlumnoShowed: boolean = false;
  alumnoTieneCursadas: boolean = false;
  generarReporte: boolean = false;
  mostrarRecibo = false;

  cols: any = [];

  textoDlgEliminar: string;


   _LABEL = LABEL;
   _LABEL_R = LABEL_REQUIRED;
   _VALIDACION = VALIDACION;
   _PATTERN = PATTERNS;
   _Util = Util;


   tituloDialogoCursada: string = this._LABEL.titulo.infoCursada;
   fechaDialogoCursada: string;
   textoDialogoCursada: string;


  ngDoCheck(){
    // console.log("alumnos", this.alumnos);
    // console.log("cursadas", this.cursadas);
    //console.log("cursada seleccionada",this.selectedCursada);
    
  }

  constructor(
              private _alumnoService: AlumnoService,
              private _spinnerService: Ng4LoadingSpinnerService,
              private _cursadaService: CursadaService,
              private _inscripcionService: InscripcionService,
              private _pagoService: PagoService
              ) { }

  ngOnInit() {
    this.prepararTabla();


    this.getCursadas();
    this._spinnerService.show();
    setTimeout(()=>{
      this.getAlumnos().then(
        () => this._spinnerService.hide()
      )},0)
  }


  getAlumnos(){
    this.alumnos = [];
    return this._alumnoService.getAlumnos()
      .toPromise().then(alumnos => {
        alumnos.forEach(alumno => {
          let nuevoAlumno =  new Alumno();
          nuevoAlumno.copiar(alumno);
          this.alumnos.push(alumno);
        })
        this.busqueda = undefined;
      })
  }
  getCursadas(){
    this.cursadas = [];
    return this._cursadaService.list()
      .toPromise().then(cursadas => {
        cursadas.forEach(cursada => {
          let nuevaCursada = new Cursada();
          nuevaCursada.copiar(cursada);
          this.cursadas.push(cursada);
        })
      })
  }

  mostrarDialogoEliminar(alumno: any){
    this.alumnoSeleccionado = new Alumno();
    this.alumnoSeleccionado.copiar(alumno);
    this.alumnoSeleccionado.nombreApellido = `${this.alumnoSeleccionado.nombre} ${this.alumnoSeleccionado.apellido}` 
    this.textoDlgEliminar =  `¿Está seguro que desea dar de baja a
                      ${ this.alumnoSeleccionado.nombreApellido }?`

    this.mostrarDialogoBorrar = true;
    
  }

  clickPagar(pago){
    this.pagoSeleccionado = new Pago();
    this.pagoSeleccionado.copiar(pago);
    this.mostrarRecibo = true;
    console.log("pago traido",pago);
    
    console.log("PAgo: ",this.pagoSeleccionado);
  }

  clickCancelarPagar(){
    this.mostrarPagosPagar = false;
    this.mostrarPagosInicio = false;
    this.tituloDialogoCursada = this._LABEL.titulo.infoCursada;
  }

  clickContinuar(){
    this.mostrarRecibo = false;
  }

  eliminar(){
    this._spinnerService.show();
    setTimeout(() => {
      this.mostrarDialogoBorrar = false;
      this._alumnoService.deleteAlumno(this.alumnoSeleccionado).
        subscribe(response =>{
          this.getAlumnos();
          this._spinnerService.hide();
          this.alumnoSeleccionado = new Alumno();
        })
    }, 500)
  }

  private agregar(alumno: Alumno){
    this._spinnerService.show();
    setTimeout(() => {
    this.alumnoSeleccionado.fechaNacimiento = + this.dateNac;
    
    console.log("alumno para postear: ",this.alumnoSeleccionado);
        alumno.fechaRegistro = + new Date();
        this._alumnoService.addAlumno(alumno).
        subscribe(response => {
          this.getAlumnos();
          this.alumnoSeleccionado = new Alumno();
          this.mostrarDialogoAB = false;
          this._spinnerService.hide();
        })
    }, 500)
  }
    
  private editar(alumno: Alumno){
      this.alumnoSeleccionado.fechaNacimiento = + this.dateNac;
    this._alumnoService.updateAlumno(alumno).
      subscribe(r => {
        this.getAlumnos();
        this.alumnoSeleccionado = new Alumno();
        this.edicion = false;
        this.mostrarDialogoAB = false;
      })  
  }

  guardar(){
    if(this.alumnoSeleccionado.id != 0){
      this.editar(this.alumnoSeleccionado)
    }
    else{
      this.agregar(this.alumnoSeleccionado);

    }
  }

  ocultarDialogo(){
    this.mostrarDialogoBorrar = false;
    this.mostrarDialogoAB = false;
    this.mostrarPagosInicio = false;
  }

  nuevoAlumno(){
    this.edicion = false;
    this.alumnoSeleccionado = new Alumno();
    this.mostrarDialogoAB = true;
  }

  editarAlumno(alumno: any){
    this.alumnoSeleccionado = new Alumno();
    this.alumnoSeleccionado.copiar(alumno);
    this.edicion = true;
    this.mostrarDialogoAB = true;
    
    this.dateNac = new Date(this.alumnoSeleccionado.fechaNacimiento);
  }


  clickCancelarNuevaInscripcion(){
    let cursadaAux: Cursada = new Cursada();
    cursadaAux.id=0;
    this.selectedCursada=cursadaAux;
    this.inscripcionShowed = false;
  }
  clickInscripcionAlumno(alumno){
    this.alumnoSeleccionado = new Alumno();
    this.alumnoSeleccionado.copiar(alumno);
    let cursadasAlumno: Cursada[] = []; 
    this._inscripcionService.getCursadasDeAlumno(this.alumnoSeleccionado.id).toPromise().then(
      cursadas  => {
        console.log("cursadas alumno",cursadas);
        cursadas.forEach(element => {
            cursadasAlumno.push(element);
            
        });
        this.cursadasFiltradas = this.getCursadasFiltradas(this.cursadas,cursadasAlumno);
        if(this.cursadasFiltradas.length > 0){
          this.selectedCursada = this.cursadasFiltradas[0];
        }
      });
    
    this.inscripcionShowed = true;
  }
  clickConfirmarInscripcion(){
    let nuevaInscripcion: Inscripcion = new Inscripcion();
    nuevaInscripcion.idAlumno = this.alumnoSeleccionado.id;
    nuevaInscripcion.idCursada = this.selectedCursada.id;
    this._inscripcionService.addInscripcion(nuevaInscripcion).subscribe();
    
    this.inscripcionShowed = false;
  }

  
  mostrarCursadasAlumno(alumno: any){
    this.alumnoSeleccionado = new Alumno();
    this.alumnoSeleccionado.copiar(alumno);
    this._inscripcionService.getCursadasDeAlumno(this.alumnoSeleccionado.id)
    .toPromise()
    .then(cursadas => {
      this.tituloDialogoCursada = this.tituloDialogoCursada +
                                  ` ${this.alumnoSeleccionado.nombre} ${this.alumnoSeleccionado.apellido}`;
                                  
      this.cursadasAlumnos = cursadas;

      console.log("cursadasAlumno",this.cursadasAlumnos);
      if(this.cursadasAlumnos.length > 0){
        this.alumnoTieneCursadas = true;                              
      }
      else{
        this.alumnoTieneCursadas = false;                              
      }
      this.cursadasAlumnoShowed = true;  
    })
  }

  ocultarCursadasAlumno(){
    this.cursadasAlumnoShowed = false;
    this.tituloDialogoCursada = this._LABEL.titulo.infoCursada;
  }


  getCursadasFiltradas(cursadasTodas: Cursada[], cursadasInscriptas: Cursada[]): Cursada[]{
    let cursadasAux = [];
    cursadasTodas.forEach(cursada =>{
      if(!cursadasInscriptas.some(e => e.id === cursada.id))
        cursadasAux.push(cursada);
    })
    console.log("cursadasAux: ",cursadasAux);
    return cursadasAux;
  }

  private cargarCampos(){
    this.cols = [
      { field: 'nombre', header: 'Nombre' },
      { field: 'telefono', header: 'Telefono' },
      { field: 'email', header: 'Email' },
      { field: 'dni', header: 'DNI' },
      { field: 'acciones', header: 'Acciones' }
    ];
  }
  mensajeReportes(alumno){
    this.alumnoSeleccionado = new Alumno();
    this.alumnoSeleccionado.copiar(alumno);
    this.generarReporte=true;
  }
  cerrarInfo(){
    this.generarReporte=false;
  }
  buscarHistorial(){
     this._alumnoService.getHistorial(this.alumnoSeleccionado.id).
       subscribe(res => {
         console.log('start download:',res);
         var url = window.URL.createObjectURL(res);
         var a = document.createElement('a');
         document.body.appendChild(a);
         a.setAttribute('style', 'display: none');
         a.href = url;
         a.download = "HistorialAcademico-"+this.alumnoSeleccionado.apellido+new Date().toLocaleDateString('en-GB');
         a.click();
         window.URL.revokeObjectURL(url);
         a.remove(); // remove the element
       })  
  }
  buscarAnalitico(){
    this._alumnoService.getAnalitico(this.alumnoSeleccionado.id).
      subscribe(res => {
        console.log('start download:',res);
        var url = window.URL.createObjectURL(res);
        var a = document.createElement('a');
        document.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = "Analitico-"+this.alumnoSeleccionado.apellido+new Date().toLocaleDateString('en-GB');
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element
      })  
 }

  private prepararTabla(){
    this.cargarCampos();
  }


  blankSpaces() {
    if(!this.nombreAlumno.trim().length) {
      return true;
    }
    return false;
  }

  mostrarPagosAlumno(alumno: any){
    this.alumnoSeleccionado = new Alumno();
    this.alumnoSeleccionado.copiar(alumno);
    this._pagoService.getPagosAlumno(this.alumnoSeleccionado.id)
    .toPromise()
    .then(pagos => {
      this.tituloDialogoCursada = this.tituloDialogoCursada + 
                                  ` ${this.alumnoSeleccionado.nombre} ${this.alumnoSeleccionado.apellido}`;
      this.pagosAlumno = pagos;

      console.log("Pagos Alumno: ",this.pagosAlumno);
      console.log("Cantidad pagos: ",this.pagosAlumno.length);
      if(this.pagosAlumno.length > 0){
        this.alumnoTienePagos = true;                              
      }
      else{
        this.alumnoTienePagos = false;                              
      }
    });
    this.mostrarPagosInicio = true;    
  }


}
