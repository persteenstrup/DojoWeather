import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';

@Component({
  selector: 'app-sanjose',
  templateUrl: './sanjose.component.html',
  styleUrls: ['./sanjose.component.css']
})
export class SanjoseComponent implements OnInit {
  weather: JSON
  city: Weather
  constructor(private _weatherService: WeatherService) {
    this.weather
    this.city = new Weather();
  }

  getWeather() {
    this._weatherService.getWeather('san jose,ca,usa',
      () => { this.city = this._weatherService.city }
    )
  }

  ngOnInit() {
    this.getWeather();
  }

}
