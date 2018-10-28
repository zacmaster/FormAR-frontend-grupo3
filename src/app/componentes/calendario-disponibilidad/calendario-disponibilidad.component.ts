import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EventService } from 'src/app/servicios/eventService';
import { LocaleDataIndex } from '@angular/common/src/i18n/locale_data';




@Component({
  selector: 'calendario-disponibilidad',
  templateUrl: './calendario-disponibilidad.component.html',
  styleUrls: ['./calendario-disponibilidad.component.css']
})
export class CalendarioDisponibilidadComponent implements OnInit {
  events: any[];
 
  options: any;
  public titulo = 'Calendario';
  @Input() public id;
  @Input() public esSala;
  @Input() public esInstructor;
  valor:number;

  @Output() clickBotonCerrar = new EventEmitter<boolean>();



  constructor(private eventService: EventService) { }
  
            
  
    ngOnInit() {
      if(this.esSala==true){
        this.valor=1;
      }
      if(this.esInstructor==true){
        this.valor=0;
      }

      this.eventService.getEvents(this.id,this.valor).then(events => {this.events = events;});
      this.options = {
        header: {
          left: 'prev,next',
          center: 'title',
          right: 'month,agendaWeek,agendaDay,list,today'
        },
        locale: 'es',
        buttonText:{
          today:    "Hoy",
          month:    "Mes",
          week:     "Semana",
          day:      "Dia",
          list:     "Lista"
        },
        titleFormat: { 
          year: 'numeric', 
        month: 'short',
         day: 'numeric' },
         allDayText : 'Todo el dia'
      };
     
    
  }
  ngDoCheck(){ 
    //console.log(this.events);
  }
  
  clickBtnCerrar(){
    this.clickBotonCerrar.emit(true);
  }
  

  
}