import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { Weather } from '../weather';

@Component({
  selector: 'app-dallas',
  templateUrl: './dallas.component.html',
  styleUrls: ['./dallas.component.css']
})
export class DallasComponent implements OnInit {
  weather: JSON
  city: Weather
  constructor(private _weatherService: WeatherService) {
    this.weather
    this.city = new Weather();
  }
  // weatherSynch() {
  //   this.weather = this._weatherService.giveData();
  //   //console.log(typeof this.weather)
  //   console.log(this.weather)
  //   this.city.temp = Math.floor(this.weather["main"]["temp"] - 273)
  //   this.city.temp_min = Math.floor(this.weather["main"]["temp_min"] - 273);
  //   this.city.temp_max = Math.floor(this.weather["main"]["temp_max"] - 273);
  //   this.city.humidity = Math.floor(this.weather["main"]["humidity"]);
  //   this.city.status = this.weather["weather"][0]["description"]
  // }

  getWeather() {
    this._weatherService.getWeather('dallas,tx,usa',
      () => { this.city = this._weatherService.city }
    )
  }

  ngOnInit() {
    this.getWeather();
  }

}
