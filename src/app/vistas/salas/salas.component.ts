import { Component, OnInit, DoCheck } from '@angular/core';
import { HVR, LABEL, LABEL_REQUIRED, setCadena , VALIDACION } from '../../utilidades/mensajes';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { PATTERNS } from '../../utilidades/patterns';
import { Sala } from '../../modelos/sala';
import { SalaService } from 'src/app/servicios/sala.service';
import { isThisSecond } from 'date-fns';

@Component({
  selector: 'app-salas',
  templateUrl: './salas.component.html',
  styleUrls: ['./salas.component.css']
})

export class SalasComponent{
  
  _LABEL = LABEL;
  _LABEL_REQUIRED = LABEL_REQUIRED;
  _HVR = HVR;
  _VALIDACION = VALIDACION;
  _PATTERN = PATTERNS;
  dlg = {
    titulo: this._LABEL.bajaSala,
    texto: ''
  }
  dlg2 = {
    titulo: '',
    texto: ''
  }

  salaSeleccionada: Sala = this.newSala();
  salas:Sala[]=[];
  busqueda: string = "";
  cols: any[];

  mostrarCalendario:boolean = false; 
  mostrarDialogoAB:boolean=false;
  public edicion: boolean = false;
  mostrarDialogoBorrar: boolean = false;
  mostrarDialogoErrorBorrar : boolean = false;
  mostrarDialogoErrorEditar: boolean = false;

  constructor(private _salaService: SalaService,
    private _spinnerService: Ng4LoadingSpinnerService){ }

  ngOnInit() {
    this.cargarCampos();
    this.getSalas();
  }
  
  ngDoCheck(){
  } 

  nuevaSala(){
    this.mostrarDialogoAB=true;

  }
  
  editarSala(sala){
    this.salaSeleccionada = new Sala();
    this.salaSeleccionada.copiar(sala);
    if(this.salaSeleccionada.ocupado==false){
      this.edicion = true;
      this.mostrarDialogoAB = true;
    }
    else{
      this.mostrarDialogoErrorModificar();
    }
   
  }
  mostrarDialogoEliminar(sala){
    this.salaSeleccionada = new Sala();
    this.salaSeleccionada.copiar(sala);
    if(this.salaSeleccionada.ocupado==false){
      this.dlg.texto =  `¿Está seguro que desea dar de baja la sala
      ${ this.salaSeleccionada.nombre } ?`;
      this.mostrarDialogoBorrar = true;
    }
    else{
      this.mostrarDialogoErrorEliminar();
    }

    
  }
  mostrarDialogoErrorEliminar(){
    this.dlg2.titulo= 'Error al eliminar una sala';
    this.dlg2.texto =  `No puede eliminar la sala ya que esta siendo ocupada con una cursada`;
    this.mostrarDialogoErrorBorrar = true;
  }
  mostrarDialogoErrorModificar(){
    this.dlg2.titulo= 'Error al editar una sala';
    this.dlg2.texto =  `No puede editar la sala ya que esta siendo ocupada con una cursada`;
    this.mostrarDialogoErrorEditar = true;
  }
  ocultarDialogoError(){
      this.mostrarDialogoErrorBorrar=false;
      this.mostrarDialogoErrorEditar=false;
  }
  verCalendario(sala){
    this.salaSeleccionada = new Sala();
    this.salaSeleccionada.copiar(sala);

    this.mostrarCalendario=true;
  }
  ocultarCalendario(){
    this.mostrarCalendario=false;
    this.salaSeleccionada=this.newSala();
  }
  ocultarDialogo(){
    this.mostrarDialogoAB=false;
    this.mostrarDialogoBorrar=false;
    this.salaSeleccionada=this.newSala();
  }
  public capacidadInvalida(): boolean{
    if(this.salaSeleccionada.capacidad== undefined){
      return true;
    }
    else{
      return false;
    }
  }
  guardar(){
    if(this.salaSeleccionada.id!=0){
      this.editar(this.salaSeleccionada);
    }
    else{
      this.agregar(this.salaSeleccionada);
    }
  }
  private agregar(sala: Sala){
    this._spinnerService.show();
    setTimeout(() => {
      console.log("sala seleccionada: ",this.salaSeleccionada);
          this._salaService.addSala(sala).
          subscribe(response => {
            this.getSalas();
            this.salaSeleccionada = this.newSala();
            this.mostrarDialogoAB = false;
            this._spinnerService.hide();
          })
      }, 500)
  }
  private editar(sala: Sala){
    this._salaService.updateSala(sala).
    subscribe(r=>{
        this.getSalas();
        this.salaSeleccionada = this.newSala();
        this.edicion=false;
        this.mostrarDialogoAB=false;
    });
  }
  
  eliminar(){
    this._spinnerService.show();
    setTimeout(() => {
      this.mostrarDialogoBorrar = false;
      this._salaService.deleteSala(this.salaSeleccionada).
        subscribe(response =>{
          this.getSalas();
          this._spinnerService.hide();
          this.salaSeleccionada = this.newSala();
        })
    }, 500)
  }

  private newSala(): Sala{
    let sala = new Sala();
    return sala;
  }
  getSalas(){
    this._spinnerService.show();
    this.salas = [];
    return this._salaService.getSalas()
      .toPromise().then(sala => {
        sala.forEach(sala => {
          let nuevaSala =  new Sala();
          nuevaSala.copiar(sala);
          this.salas.push(nuevaSala);
        })
        this._spinnerService.hide();
        this.busqueda = undefined;
      })
  }

  private cargarCampos(){
    this.cols = [
      { field: 'nombre', header: 'Nombre'},
      { field: 'capacidad', header:'Capacidad'},
      { field: 'disponibilidad', header:'Disponibilidad'},
      { field: 'acciones', header:'Acciones'},
    ];
  }

}
