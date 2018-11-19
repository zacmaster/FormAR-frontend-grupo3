export class Util {
    static convertirTimestamp(timestamp: number): string{
        let date = new Date(timestamp);
        return date.toLocaleDateString('en-GB');
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
                d1.getDay() == d2.getDay();
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
}
