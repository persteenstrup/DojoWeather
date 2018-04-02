import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Weather } from './weather';

@Injectable()
export class WeatherService {
  apikey: string
  apiresponse: JSON
  city: Weather
  units: string
  unitHtml: string
  constructor(private _http: Http) {
    this.apikey = 'ad99c2a0656f477f300cde2e74b942f2';
    this.apiresponse;
    this.city = new Weather();
    this.units = 'celsius';
    this.unitHtml = '<span>&#8451;</span>'
  }

  getWeather(location: string, wSynch_comp) {
    this._http.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=${this.apikey}`).subscribe(
      (res) => {
        this.apiresponse = res.json();
        if (this.units == 'celsius') {
          this.weatherMetric(this.apiresponse, wSynch_comp)
        }
        else { this.weatherImperial(this.apiresponse, wSynch_comp) }
      })
  }

  weatherMetric(weatherForcast: JSON, wSynch_comp) {
    const apiMainPath = this.apiresponse["main"]
    this.city.temp = apiMainPath["temp"];
    this.city.temp_min = apiMainPath["temp_min"];
    this.city.temp_max = apiMainPath["temp_max"];
    this.city.humidity = Math.floor(apiMainPath["humidity"]);
    this.city.status = this.capFirstLetter(this.apiresponse["weather"][0]["description"])
    wSynch_comp()
  }

  weatherImperial(weatherForcast: JSON, wSynch_comp){
    const apiMainPath = this.apiresponse["main"]
    this.city.temp = this.celsiusToFahrenheit(apiMainPath["temp"]);
    this.city.temp_min = this.celsiusToFahrenheit(apiMainPath["temp_min"]);
    this.city.temp_max = this.celsiusToFahrenheit(apiMainPath["temp_max"]);
    this.city.humidity = Math.floor(apiMainPath["humidity"]);
    this.city.status = this.capFirstLetter(this.apiresponse["weather"][0]["description"])
    wSynch_comp()
  }

  capFirstLetter(str: string) {
    return str.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
  }

  updateUnits(newUnit:string, callback){
    this.units = newUnit;
    if(this.units == 'celsius'){
      this.unitHtml = '<span>&#8451;</span>';
      this.changeWeatherUnits(this.fahrenheitToCelsius, callback);
    }
    else {
      this.unitHtml = '<span>&#8457;</span>'
      this.changeWeatherUnits(this.celsiusToFahrenheit, callback);     
    };
  }

  celsiusToFahrenheit(c){
    return (9/5)*c+32
  }

  fahrenheitToCelsius(f){
    return (f-32)*(5/9)
  }

  changeWeatherUnits(tempConversionFunction, callback){
    this.city.temp = tempConversionFunction(this.city.temp);
    this.city.temp_max = tempConversionFunction(this.city.temp_max);
    this.city.temp_min = tempConversionFunction(this.city.temp_min);
    callback();
  }
}

