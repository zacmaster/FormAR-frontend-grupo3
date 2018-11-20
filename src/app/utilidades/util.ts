export class Util {
    static convertirTimestamp(timestamp: number): string{
        let date = new Date(timestamp);
        return date.toLocaleDateString('en-GB');
    } 
    static convertirDate(date: Date): string{
        console.log('el date que me pasaron:',date)
        return date.toLocaleDateString('en-GB');
    }

    static convertirTimestampConHora(timestamp: number): string{
        let date = new Date(timestamp);
        return date.toLocaleDateString('en-GB') + ' ' + date.toLocaleTimeString('en-GB').match(/\d{2}:\d{2}|[AMP]+/g).join(' '); 

    }
    
    static convertirTime(timestamp: number): string{
        let date = new Date(timestamp);
        
        return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    //Devuelve true si los dos días son el mismo, aunque tengan distinta hora..
    static esMismoDia(dia1: number, dia2: number): boolean{  
        let d1: Date = new Date(dia1) ;
        let d2: Date = new Date(dia2) ;

        return  d1.getFullYear() == d2.getFullYear() &&
                d1.getMonth() == d2.getMonth() &&
                d1.getDate() == d2.getDate();
    }

    static yaPaso(dia1: number): boolean{
        let dia: Date = new Date(dia1);
        let hoy: Date = new Date();
        if(dia.getFullYear() < hoy.getFullYear()) return true;
        if(dia.getFullYear() == hoy.getFullYear()){
            if(dia.getMonth() > hoy.getMonth()){
                return false;
            }
            else if(dia.getMonth() < hoy.getMonth()){
                return true;
            }
            else{ //mismo mes
                if(dia.getDate() > hoy.getDate()){
                    return false;
                } 
                else if(dia.getDate() < hoy.getDate()){
                    return true;
                }
                else{ //mismo dia
                    return false;
                }
            }
        }
    }


    
    static esHoy(dia: number): boolean{
        return this.esMismoDia(dia, + new Date())
    }

    static esMismoTiempo(fecha1, fecha2){
        let d1: Date = new Date(fecha1) ;
        let d2: Date = new Date(fecha2) ;

        return  d1.getFullYear() == d2.getFullYear() &&
                d1.getMonth() ==    d2.getMonth() &&
                d1.getDay() ==      d2.getDay() &&
                d1.getHours() ==    d2.getHours() &&
                d1.getMinutes() ==  d2.getMinutes() &&
                d1.getSeconds() ==  d2.getSeconds();
    }

    static postergarPorDias(days) {
        var result = new Date();
        result.setDate(result.getDate() + days);
        return result;
      }
}
