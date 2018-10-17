export class Util {
    static convertirTimestamp(timestamp: number): string{
        let date = new Date(timestamp);
        return date.toLocaleDateString('en-GB');
    }    
}
