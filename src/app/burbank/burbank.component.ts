import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';

@Component({
  selector: 'app-burbank',
  templateUrl: './burbank.component.html',
  styleUrls: ['./burbank.component.css']
})
export class BurbankComponent implements OnInit {
  weather: JSON;
  city: Weather;
  units: string;
  unitHtml: string;
  constructor(private _weatherService: WeatherService) {
    this.weather
    this.city = new Weather();
    this.unitHtml = '<span>&#8451;</span>';
    this.units = 'celsius'
  }

  getWeather() {
    //makes weather call and retrieves data
    this._weatherService.getWeather('burbank,ca,usa',
      () => { 
        this.city = this._weatherService.city;
        this.units = this._weatherService.units;
        this.unitHtml = this._weatherService.unitHtml;  
      })
  }

  updateUnits(newUnits:string){
    //if there is no change do nothing
    if(this.units == newUnits){return}
    //else update units
    this._weatherService.updateUnits(newUnits,
      () => {
        this.units = this._weatherService.units;
        this.unitHtml = this._weatherService.unitHtml;
        this.city = this._weatherService.city;
      })
  }

  ngOnInit() {
    this.getWeather();
  }

}
