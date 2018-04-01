import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';

@Component({
  selector: 'app-seattle',
  templateUrl: './seattle.component.html',
  styleUrls: ['./seattle.component.css']
})
export class SeattleComponent implements OnInit {
  weather:JSON
  city:Weather
  constructor(private _weatherService:WeatherService) {
    this.weather
    this.city = new Weather();
   }
  
  getWeather() {
    this._weatherService.getWeather('Seattle,wa,usa',
      () => { this.city = this._weatherService.city }
    )
  }
  
  ngOnInit() {
    // console.log("init run");
    this.getWeather();
  }

}
