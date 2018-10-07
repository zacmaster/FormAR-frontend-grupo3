import { Component, OnInit, DoCheck } from '@angular/core';
import { LABEL, HVR, setCadena } from '../../utilidades/mensajes';
import { CursoService } from '../../servicios/curso.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Curso } from '../../modelos/curso';
import { TipoCursoService } from '../../servicios/tipo-curso.service';
import { TipoCurso } from '../../modelos/tipo-curso';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit, DoCheck {
  
  public cursos = [];
  public cursosCopia = [];
  public tipoCursos = [];
  

  _LABEL = LABEL;
  _HVR = HVR;

  cursoSeleccionado: Curso;
  mostrarDialogoBorrar: boolean = false;
  mostrarDialogoAB: boolean = false;
  edicion: boolean = false;
  temarioShowed = false;

  dlg = {
    titulo: this._LABEL.bajaCurso,
    texto: ''
  }
  
  
  



  constructor(private _cursoService: CursoService,
              private _tipoCursoService: TipoCursoService,
              private _spinnerService: Ng4LoadingSpinnerService) { }

  ngOnInit() {
    this.getCursos();
  }
  ngDoCheck(){
  }

  getCursos(){
    Promise.all([
      this._tipoCursoService.getTipoCursos().toPromise(),
      this._cursoService.getCursos().toPromise()
    ]).then( r => {
      r[0].forEach(e => {
        if(!e.disabled)
          this.tipoCursos.push(e)
      });
      r[1].forEach(e => {
        if(!e.disabled)
          this.cursos.push(e)
      })
    }).then(
      () => {
        this.configuracionCurso(this.cursos, this.tipoCursos)
        console.log("cursos copia",this.cursosCopia);
        
      })
    }


  private configuracionCurso(cursos, tipoCursos: TipoCurso[]){
    cursos.forEach(curso => {
      tipoCursos.forEach(tipo => {
        if(curso.tipo == tipo.id){
          var cursoCopia = curso;
          cursoCopia.tipoName = tipo.name;
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
          this.getCursos();
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
    let tipoCursoDefault = this.tipoCursos[0].id;
    return new Curso('',tipoCursoDefault,'');
  }

  mostrarDialogoEliminar(){
    setCadena(this.cursoSeleccionado.name);
    console.log(this.cursoSeleccionado);
    
    this.dlg.texto = this._LABEL.seguroEliminarCurso;
    this.mostrarDialogoBorrar = true;
    
  }






}
