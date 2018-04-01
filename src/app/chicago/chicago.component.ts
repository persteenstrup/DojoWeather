import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';

@Component({
  selector: 'app-chicago',
  templateUrl: './chicago.component.html',
  styleUrls: ['./chicago.component.css']
})
export class ChicagoComponent implements OnInit {
  weather: JSON;
  city: Weather;
  units: string;
  constructor(private _weatherService: WeatherService) {
    this.weather
    this.city = new Weather();
    this.units = '<span>&#8451;</span>';
  }

  getWeather() {
    this._weatherService.getWeather('chicago,il,usa',
      () => { this.city = this._weatherService.city }
    )
  }

  ngOnInit() {
    this.getWeather();
  }

}

