export class Util {
    static convertirTimestamp(timestamp: number): string{
        let date = new Date(timestamp);
        return date.toLocaleDateString('en-GB');
    } 
    
    static convertirTime(timestamp: number): string{
        let date = new Date(timestamp);
        
        return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    static fechaHoy(): string{
        return this.convertirTimestamp(+ new Date());
    }
}
