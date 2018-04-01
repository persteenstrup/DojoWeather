export class Weather {
    temp:number;
    temp_min:number;
    temp_max:number;
    humidity:number;
    status:string;
    constructor(){
        this.temp = 0;
        this.temp_min = 0;
        this.temp_max = 0;
        this.humidity = 0;
        this.status = "empty"
    }
}
