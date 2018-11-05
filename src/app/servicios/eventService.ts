import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CalendarioService } from './calendario.service';

@Injectable( {providedIn: 'root'})
export class EventService {
    eventosAux: any[];
    constructor(private _calendarioService: CalendarioService) { }

   
    //1 es sala 0 es instructor
    getEvents(id:number,valor:number){
      if(valor==1){
        this.eventosAux=[];
        return this._calendarioService.readSala(id)
          .toPromise().then(clases => {
            clases.forEach(aux=> {
              let auxiliar=aux;
              console.log(auxiliar);
              aux.clases.forEach(horario=>{
                  let clase = new MyEvent();
                 
                  if(aux.ocupacionTentativa==true){
                    clase.title= auxiliar.nombreCursada ;
                    clase.backgroundColor="green";
                  }
                  else{
                    clase.title= auxiliar.nombreCursada;
                    clase.backgroundColor="red";
                  }
                  clase.start= this.dateToString(new Date(horario.fecha),new Date(horario.horaInicio));
                  
                  clase.end = this.dateToString(new Date(horario.fecha),new Date(horario.horaFin));
                  
                  clase.backgroundColor="red";
                  this.eventosAux.push(clase);
              })
            })
            return this.eventosAux;
          })
      }
      else{
        this.eventosAux=[];
        return this._calendarioService.readInstructor(id)
          .toPromise().then(clases => {
            clases.forEach(aux=> {
              let auxiliar=aux;
              console.log(auxiliar);
              aux.clases.forEach(horario=>{
                  let clase = new MyEvent();
                  if(aux.ocupacionTentativa==true){
                    clase.title= auxiliar.nombreCursada ;
                    clase.backgroundColor="green";

                  }
                  else{
                    clase.title= auxiliar.nombreCursada;
                    clase.backgroundColor="red";
                  }
                  clase.start= this.dateToString(new Date(horario.fecha),new Date(horario.horaInicio));
                  clase.end = this.dateToString(new Date(horario.fecha),new Date(horario.horaFin));
                 
                
                  this.eventosAux.push(clase);
              })
            })
            return this.eventosAux;
          })
      }
        
      }
      dateToString(fecha:Date,hora:Date):string{
        let stringAux:string;
        let dia = this.dateTolocal(fecha);
        let horario= this.dateTolocal(hora);
        let dia2 = dia.slice(0,10);
        let horario2 = horario.slice(10,19);
        stringAux= dia2+horario2;
        return stringAux;
      }

      dateTolocal(date : Date) :string{
          var tzo = -date.getTimezoneOffset(),
              dif = tzo >= 0 ? '+' : '-',
              pad = function(num) {
                  var norm = Math.floor(Math.abs(num));
                  return (norm < 10 ? '0' : '') + norm;
              };
          return date.getFullYear() +
              '-' + pad(date.getMonth() + 1) +
              '-' + pad(date.getDate()) +
              'T' + pad(date.getHours()) +
              ':' + pad(date.getMinutes()) +
              ':' + pad(date.getSeconds()) +
              dif + pad(tzo / 60) +
              ':' + pad(tzo % 60);
        
      }
    
      pasarJson():string{
       let json= JSON.stringify(this.eventosAux);
       console.log(json);
       return JSON.parse(json);
      }
    }
    
    
    export class MyEvent {
      title: string;
      start: string;
      end: string;
      backgroundColor: string;
      eventClick: Function ;
     
    }