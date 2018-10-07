import { Component, OnInit } from '@angular/core';
import { LABEL, HVR } from '../../utilidades/mensajes';
import { CursoService } from '../../servicios/curso.service';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  public cursos = [];


  _LABEL = LABEL;
  _HVR = HVR;


  constructor(private _cursoService: CursoService) { }

  ngOnInit() {

  }

  getCursos(){
    this._cursoService.getCursos()
      .subscribe(response =>{
        this.cursos = response;
      })
  }

}
