import { Component, OnInit, DoCheck } from '@angular/core';
import { HVR, LABEL, LABEL_REQUIRED, setCadena } from '../../utilidades/mensajes';
import { CursoService } from '../../servicios/curso.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Curso } from '../../modelos/curso';
import { AreaService } from '../../servicios/area.service';
import { Area } from '../../modelos/area';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit, DoCheck {
  
  public cursos = [];
  public cursosCopia = [];
  public areas = [];
  busqueda;
  
  
  edicionArea: boolean = false;
  popupAreasShowed: boolean = false;
  
  
  private nombreNuevoArea: string;

  _LABEL = LABEL;
  _LABEL_REQUIRED = LABEL_REQUIRED;
  _HVR = HVR;
  
  public areaSeleccionada: Area = this.newArea();
  public cursoSeleccionado: Curso = this.newCurso();



  mostrarDialogoBorrar: boolean = false;
  mostrarDialogoAB: boolean = false;
  edicion: boolean = false;
  temarioShowed = false;

  dlg = {
    titulo: this._LABEL.bajaCurso,
    texto: ''
  }



  constructor(private _cursoService: CursoService,
              private _areaService: AreaService,
              private _spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.descargarCursos();
  }
  ngDoCheck(){
    
  }


  private configuracionCurso(cursos, areas: Area[]){
    cursos.forEach(curso => {
      areas.forEach(area => {
        if(curso.idArea == area.id){
          var cursoCopia = curso;
          cursoCopia.area = area;
          this.cursosCopia.push(cursoCopia);
        }
      })
    })
  }

      


  eliminar(){
    this._spinnerService.show();
    setTimeout(() => {
      this.mostrarDialogoBorrar = false;
      this._cursoService.deleteCurso(this.cursoSeleccionado).
        subscribe(response =>{
          this._spinnerService.hide();
          this.cursoSeleccionado = this.newCurso();
        })
    }, 1000)
  }


  private agregar(curso: Curso){
    this._cursoService.getCursos().toPromise().
      then( lista => {
          curso.id = Math.max.apply(Math, lista.map(function(o){ return o.id })) + 1
      }).
      then(() => {
        this._cursoService.addCurso(curso).
        subscribe(response => {
          this.cursos.push(curso);
          this.cursoSeleccionado = this.newCurso();
          this.mostrarDialogoAB = false;
        })

      })
  }

  private editar(curso: Curso){
    
    this._cursoService.updateCurso(curso).
      subscribe(r => {
        this.cursoSeleccionado = this.newCurso();
        this.edicion = false;
        this.mostrarDialogoAB = false;
      })  
  }

  ocultarDialogo(){
    this.mostrarDialogoBorrar = false;
    this.mostrarDialogoAB = false;
  }

  nuevoCurso(){
    this.edicion = false;
    this.cursoSeleccionado = this.newCurso();
    this.mostrarDialogoAB = true;
  }

  cerrarDialogo(){
    this.mostrarDialogoAB = false;
  }

  editarCurso(){
    this.edicion = true;
    this.mostrarDialogoAB = true;
  }

  guardar(){
    if(this.cursoSeleccionado.id){
      this.editar(this.cursoSeleccionado)
    }
    else
      this.agregar(this.cursoSeleccionado)
  }

  mostrarTemario(){
    this.temarioShowed = true;
  }

  cerrarTemario(){
    this.temarioShowed = false;
  }


  private newCurso(): Curso{
    return new Curso('','',0);
  }

  clickAgregarArea(nombre: string){
    // this.areas.push(this.nombreNuevoArea);
    this._areaService.addArea(this.areaSeleccionada).toPromise().
    then(() => {
      this.getAreas();
      this.areaSeleccionada = this.newArea();
    })
  }

  private editarArea(area: Area){
    this.edicionArea = true;
    this.areaSeleccionada.copiar(area);
  }

  updateArea(area: Area){
    this._areaService.updateArea(area).toPromise()
    .then(() =>{
      this.areaSeleccionada = this.newArea();
      this.edicionArea = false;
      this.getAreas();

    }
    )
  }
  eliminarArea(area: Area){
    this._spinnerService.show();
    this._areaService.deleteArea(area).toPromise()
      .then(() => {
        this.getAreas();
        this._spinnerService.hide();
      })
  }

  private getAreas(){
    this._spinnerService.show();
    this._areaService.getAreas()
      .subscribe(response => {
        this.areas = response;
        this._spinnerService.hide();
        console.log("areas: ",this.areas)
      })
  }
  mostrarDialogoEliminar(){

    // console.log("eliminando:",this.cursoSeleccionado);
    setCadena(this.cursoSeleccionado.nombre);
    this._LABEL = LABEL;
    
    this.dlg.texto = this._LABEL.seguroEliminarCurso;
    this.mostrarDialogoBorrar = true;
    
  }

  mostrarPopupAreas(){
    this.edicionArea = false;
    this.getAreas();
    this.popupAreasShowed = true;
  }
  ocultarPopupAreas(){
    this.popupAreasShowed = false;
    this.areaSeleccionada = this.newArea();
  }

  private newArea(): Area{
    let area = new Area('');
    return area;
  }

  private descargarCursos(){
    Promise.all([
      this._areaService.getAreas().toPromise(),
      this._cursoService.getCursos().toPromise()
    ])
    .then(r => {
      r[0].forEach(area => {
        this.areas.push(area);
      });
      r[1].forEach(curso => {
        this.cursos.push(curso)
      });
    })
    .then(() => this.configuracionCurso(this.cursos,this.areas))
  }



}
