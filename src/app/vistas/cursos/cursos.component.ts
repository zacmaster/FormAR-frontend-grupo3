import { Component, OnInit, DoCheck } from '@angular/core';
import { HVR, LABEL, LABEL_REQUIRED, setCadena, VALIDACION } from '../../utilidades/mensajes';
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
  
  cursos: Curso[] = [];
  areas: Area[] = [];

  cols = [];
  private cursoSeleccionado: Curso = this.newCurso();
  private areaSeleccionada: Area = this.newArea();
  busqueda: string = "";
  
  
  edicionArea: boolean = false;
  popupAreasShowed: boolean = false;
  
  
  
  private nombreNuevoArea: string = "";

  _LABEL = LABEL;
  _LABEL_REQUIRED = LABEL_REQUIRED;
  _HVR = HVR;
  



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
    this.getAreas();
    this.getCursos();
    this.cargarCampos();
  }
  ngDoCheck(){
    // console.log("area seleccionada: ",this.areaSeleccionada);
    // console.log("curso seleccionado: ",this.cursoSeleccionado);
    // console.log("ara de curso: ", this.cursoSeleccionado.area);
    // console.log("input: ", this.nombreNuevoArea)
    // console.log("cursos: ", this.cursos);
    // console.log("busqueda: ", this.busqueda);
    
    // console.log("areas: ",this.areas);
    
    
    
  }


      
  areaSelect(){
    if(!this.edicion){
      return this.areas[0].id
    }
    else
      return this.cursoSeleccionado.id
  }

  eliminar(){
    this._spinnerService.show();
    setTimeout(() => {
      this.mostrarDialogoBorrar = false;
      this._cursoService.deleteCurso(this.cursoSeleccionado).
        subscribe(response =>{
          this.cursoSeleccionado = this.newCurso();
          this.getCursos();
          this._spinnerService.hide();
        })
    }, 500)
  }


  private agregar(curso: Curso){
        this._cursoService.addCurso(curso).
        toPromise().then(() => {
          this.cursoSeleccionado = this.newCurso();
          this.mostrarDialogoAB = false;
          this.getCursos();

      }).then(this.busqueda = undefined)
  }

  private editar(curso: Curso){
    
    this._cursoService.updateCurso(curso).
      subscribe(r => {
        this.cursoSeleccionado = this.newCurso();
        this.edicion = false;
        this.mostrarDialogoAB = false;
        this.getCursos();
      })  
  }

  ocultarDialogo(){
    this.mostrarDialogoBorrar = false;
    this.mostrarDialogoAB = false;
  }

  //muestra el formulario vacío
  nuevoCurso(){
    this.edicion = false;
    this.cursoSeleccionado = this.newCurso();
    this.cursoSeleccionado.area = this.newArea(); //Método seguro para el copiado
    //console.log("nuevoCurso(). cursoSeleccionado: ",this.cursoSeleccionado);
    
    if(this.areas[0] != undefined ){
      this.areaSeleccionada.copiar(this.areas[0]);
    }
    // console.log("this.cursoSeleccionado.area: ",this.cursoSeleccionado.area);
    
    this.cursoSeleccionado.area.copiar(this.areaSeleccionada);
    this.mostrarDialogoAB = true;
  }

  cerrarDialogo(){
    this.mostrarDialogoAB = false;
  }

  editarCurso(curso: any){
    this.cursoSeleccionado = new Curso();
    this.cursoSeleccionado.copiar(curso);
    this.areaSeleccionada.copiar(this.areas[0])
    this.edicion = true;
    this.seleccionAreaAlEditar();
    this.mostrarDialogoAB = true;
    this.busqueda = undefined;
  }

  private seleccionAreaAlEditar(){
    for (let index = 0; index < this.areas.length; index++) {
      if(this.areas[index].id === this.cursoSeleccionado.area.id){
        this.areaSeleccionada = this.areas[index];
      }
    }
    this.areas.forEach(area => {
      if(this.cursoSeleccionado.id === area.id){

      }
    })
  }
  guardar(){
    if(this.cursoSeleccionado.id != 0){
      this.copiarAAreaCurso(this.areaSeleccionada);
      this.editar(this.cursoSeleccionado)
    }
    else
      this.agregar(this.cursoSeleccionado);
  }

  mostrarTemario(curso: any){
    this.cursoSeleccionado = new Curso();
    this.cursoSeleccionado.copiar(curso);
    this.temarioShowed = true;
  }

  cerrarTemario(){
    this.temarioShowed = false;
  }


  private newCurso(): Curso{
    let curso = new Curso();
    curso.area = null;
    return curso;
  }
  private copiarAAreaCurso(area: Area){
    for(let atributo in area){
      this.cursoSeleccionado.area[atributo] = area[atributo];
    }
  }

  clickAgregarArea(nombre: string){
    let nuevaArea = new Area();
    nuevaArea.nombre = nombre;
    
    this._areaService.addArea(nuevaArea).toPromise().
    then(() => {
      this.getAreas()
    })
  }

  editarArea(area: Area){
    this.edicionArea = true;
    this.nombreNuevoArea = area.nombre;
  }
  
  updateArea(area: Area){
    area.nombre = this.nombreNuevoArea;
    this.nombreNuevoArea = "";
    this._areaService.updateArea(area).toPromise()
    .then(() =>{
      this.areaSeleccionada = this.newArea();
      this.edicionArea = false;
      this.getAreas();

    })
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
    this._areaService.getAreas()
      .subscribe(areas => {
        this.areas = [];
        areas.forEach(area => {
          let nuevaArea = new Area();
          nuevaArea.copiar(area);
          this.areas.push(nuevaArea);
        });

        if(this.areas.length !== 0){
          this.areaSeleccionada = this.areas[0];
        }
      })
  }
  mostrarDialogoEliminar(curso: any){
    this.cursoSeleccionado = new Curso();
    this.cursoSeleccionado.copiar(curso);
    this.dlg.texto =  `¿Está seguro que desea dar de baja el curso
    ${ this.cursoSeleccionado.nombre } ?`;
    this.mostrarDialogoBorrar = true;
    
  }

  mostrarPopupAreas(){
    this.edicionArea = false;
    this.getAreas();
    this.popupAreasShowed = true;
  }
  ocultarPopupAreas(){
    this.nombreNuevoArea = "";
    this.popupAreasShowed = false;
    if(this.areas.length !== 0){
      this.areaSeleccionada = this.areas[0];
    }
  }

  private newArea(): Area{
    return new Area();
  }

  private getCursos(){
    this.cursos = [];
    this._spinnerService.show();
    setTimeout(() =>{
      this._cursoService.list()
      .subscribe(cursos => {
        cursos.forEach(curso => {
          let nuevoCurso = new Curso();
          let nuevaArea = new Area();

          nuevaArea.copiar(curso.area); //work-around por serialización
          //console.log("este es el curso que me llega: ",curso);
          
          nuevoCurso.copiar(curso);

          nuevoCurso.area = nuevaArea;
          this.cursos.push(nuevoCurso)
        })
        this._spinnerService.hide();
        this.busqueda = undefined;
      })
    }
      ,0)
    
  }

  seleccionarArea(area){
    this.areaSeleccionada = area;
    this.cursoSeleccionado.area.copiar(this.areaSeleccionada);
  }

  deshabilitarNuevaArea(): boolean {
    if (!this.nombreNuevoArea.trim().length) {
      return true;
    }
    return this.nombreNuevoArea.length < 3;
  }

  areaEnUso(area): boolean{
    let enUso: boolean = false;
    if(this.cursos.length > 0){
      this.cursos.forEach(curso => {
        if(curso.area.id == area.id)
          enUso = true
      })
    } 
    return enUso;
  }



  private cargarCampos(){
    this.cols = [
      { field: 'nombre', header: 'Nombre del curso' },
      { field: 'area', header: 'Área' },
      { field: 'info', header: 'Info' },
      { field: 'acciones', header: 'Acciones' }
    ];
  }

}
