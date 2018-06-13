import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Temperature } from '../temperature';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.less']
})
export class CityComponent implements OnInit, OnDestroy {

  @Input() temperature : Temperature;

  @Input() city_code : number;

  @Input() city_name : string;

  @Input() show_details : boolean = false;

  interval : any = null;

  loading : boolean = false;

  constructor(private weatherService : WeatherService) { }

  ngOnInit() {
    this.load();
    this.interval = setInterval(async () => {
      console.log('reloading', this.city_name);
      await this.load();
    }, 60000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  async load() {
    this.loading = true;
    this.temperature = await this.weatherService.consult_city(this.city_code);
    this.loading = false;
  }

  getFontColor() {
    if (!this.temperature || !this.temperature.temperature) {
      return '';
    } else if (this.temperature.temperature < 6) {
      return 'blue';
    } else if (this.temperature.temperature < 26) {
      return 'orange';
    } else {
      return 'red';
    }
  }

}
