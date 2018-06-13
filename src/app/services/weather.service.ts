import { Injectable } from '@angular/core';
import { Temperature } from '../temperature';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable()
export class WeatherService {

  constructor(
    private httpClient: HttpClient,
    private cacheService : CacheService
  ) { }

  fetch_city(code) {
    let url = `http://api.openweathermap.org/data/2.5/weather?id=${code}&APPID=${environment.weather_api}&units=metric`;
    return this.httpClient
      .get(url, {observe: 'response'})
      .toPromise()
      .then((response) => {
        if (response.status != 200)
          throw new Error();
        return response.body;
      })
      .then((response : any) => {
        let t = new Temperature();
        t.failed = false;
        t.city = response.name;
        t.country = response.sys.country;
        t.temperature = response.main.temp;
        t.humidity = response.main.humidity;
        t.pressure = response.main.pressure;
        t.updated_at = new Date();
        return t;
      })
      .catch((e) => {
        console.log(e);
        let t = new Temperature();
        t.failed = true;
        return t;
      });
  }

  async consult_city(code) {
    let cached_value = this.cacheService.getValue(code);
    if (cached_value) {
      return cached_value;
    } else {
      let new_value = await this.fetch_city(code);
      if (new_value && !new_value.failed) {
        this.cacheService.setValue(code, new_value);
      }
      return new_value;
    }
  }

}
