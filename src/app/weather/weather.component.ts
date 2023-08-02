import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})
export class WeatherComponent {
  myWeather: any;
  temperature: number = 0;
  feelsLike: number = 0;
  pressure: number = 0;
  humidity: number = 0;
  summary: string = '';
  iconURL: string = '';
  
  city: string = 'Lagos';
  units: string = 'metric';

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService.getWeather(this.city, this.units).subscribe({
      next: (res) => {
        this.myWeather = res;
        this.temperature = this.myWeather.main.temp;
        this.feelsLike = this.myWeather.main.feels_like;
        this.pressure = this.myWeather.main.pressure;
        this.humidity = this.myWeather.main.humidity;
        this.summary = this.myWeather.weather[0].main;

        this.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon +'@2x.png';
      },
      error: (error) => console.log(error.message),
      complete: () => console.info('API call completed'),
    });
  }
}
