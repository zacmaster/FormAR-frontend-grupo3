import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../modelos/alumno';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PATTERNS } from '../../utilidades/patterns';
import { VALIDACION, LABEL, LABEL_REQUIRED } from '../../utilidades/mensajes';
import { AlumnoService } from '../../servicios/alumno.service';

@Component({
  selector: 'alumnos-list',
  templateUrl: './alumnos-list.component.html',
  styleUrls: ['./alumnos-list.component.css']
})
export class AlumnosListComponent implements OnInit {
  public alumnos = [];
  public edicion: boolean = false;
  tituloNuevoAlumno = "Nuevo alumno";
  tituloEdicionAlumno = "Edición de alumno";
  mostrarDialogoAB = false;
  mostrarDialogoBorrar: boolean = false;
  alumnoSeleccionado: Alumno = this.newAlumno();
  nombreAlumno: string = '';
  textoAgregar = "Agregar";
  textoEditar = "Guardar";
  busqueda;

  dlg = {
    titulo: 'Baja de alumno',
    texto: ''
  }

   _LABEL = LABEL;
   _LABEL_R = LABEL_REQUIRED;
   _VALIDACION = VALIDACION;
   _PATTERN = PATTERNS;



  constructor(private _alumnoService: AlumnoService,
              private _spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getAlumnos();
  }


  getAlumnos(){
    this._alumnoService.getAlumnos()
      .subscribe(response =>{
        this.alumnos = response
        
      })
  }


  mostrarDialogoEliminar(){
    this.dlg.texto =  `¿Está seguro que desea dar de baja a
                      ${ this.alumnoSeleccionado.name }
                      ${ this.alumnoSeleccionado.lastname } ?`

    this.mostrarDialogoBorrar = true;
    
  }

  eliminar(){
    this._spinnerService.show();
    setTimeout(() => {
      this.mostrarDialogoBorrar = false;
      this._alumnoService.deleteAlumno(this.alumnoSeleccionado).
        subscribe(response =>{
          this.getAlumnos();
          this._spinnerService.hide();
          this.alumnoSeleccionado = this.newAlumno();
        })
    }, 1000)
  }

  private agregar(alumno: Alumno){
    this._alumnoService.getAlumnos().toPromise().
      then( lista => {
          alumno.id = Math.max.apply(Math, lista.map(function(o){ return o.id })) + 1
      }).
      then(() => {
        this._alumnoService.addAlumno(alumno).
        subscribe(response => {
          this.alumnos.push(alumno);
          this.alumnoSeleccionado = this.newAlumno();
          this.mostrarDialogoAB = false;
        })

      })
  }
  
  private editar(alumno: Alumno){
    
    this._alumnoService.updateAlumno(alumno).
      subscribe(r => {
        this.alumnoSeleccionado = this.newAlumno();
        this.edicion = false;
        this.mostrarDialogoAB = false;
      })  
  }

  guardar(){
    if(this.alumnoSeleccionado.id){
      this.editar(this.alumnoSeleccionado)
    }
    else
      this.agregar(this.alumnoSeleccionado)
  }

  ocultarDialogo(){
    this.mostrarDialogoBorrar = false;
    this.mostrarDialogoAB = false;
  }

  nuevoAlumno(){
    this.edicion = false;
    this.alumnoSeleccionado = this.newAlumno();
    this.mostrarDialogoAB = true;
  }

  editarAlumno(){
    this.edicion = true;
    this.mostrarDialogoAB = true;
  }

  private newAlumno(): Alumno{
    return new Alumno('','','','','')
  }

}
