import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Weather } from './weather';



@Injectable()
export class WeatherService {
  apikey: string
  apiresponse: JSON
  city: Weather
  constructor(private _http: Http) {
    this.apikey = 'ad99c2a0656f477f300cde2e74b942f2';
    this.apiresponse;
    this.city = new Weather();
  }

  giveData() {
    return this.apiresponse
  }
  
  getWeather(location: string, wSynch_comp) {
    //console.log(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${this.apikey}`)
    this._http.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${this.apikey}`).subscribe(
      (res) => {
        this.apiresponse = res.json();
        console.log(this.apiresponse)
        this.city.temp = Math.floor(this.apiresponse["main"]["temp"] - 273)
        this.city.temp_min = Math.floor(this.apiresponse["main"]["temp_min"] - 273);
        this.city.temp_max = Math.floor(this.apiresponse["main"]["temp_max"] - 273);
        this.city.humidity = Math.floor(this.apiresponse["main"]["humidity"]);
        this.city.status = this.capFirstLetter(this.apiresponse["weather"][0]["description"])
        wSynch_comp()
      })
  }

  capFirstLetter(str: string){
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
}
