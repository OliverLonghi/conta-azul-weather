import { TestBed, inject, async } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Temperature } from '../temperature';
import { CacheService } from './cache.service';
import {environment} from '../../environments/environment.test';

describe('WeatherService', () => {

  let ubirici_code = 3445709;
  let city_with_error_code = -1;
  let injector: TestBed;
  let cacheServiceSpy: jasmine.SpyObj<CacheService>;
  let httpMock: HttpTestingController;

  let return_ok = {
    name: 'Urubici',
    sys: {
      country: 'BR'
    },
    main: {
      temp: 3.14,
      humidity: 0,
      pressure: 0
    }
  };

  let return_error_code = {
    status: 404, 
    statusText: 'ERROR'
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CacheService', ['getValue', 'setValue']);
    TestBed.configureTestingModule({
      providers: [WeatherService, { provide: CacheService, useValue: spy }],
      imports: [HttpClientTestingModule]
    });
    cacheServiceSpy = TestBed.get(CacheService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([WeatherService], (service: WeatherService) => {
    expect(service).toBeTruthy();
  }));

  it('should get Urubici data', async(inject([WeatherService], (service: WeatherService) => {
    service.fetch_city(ubirici_code).then((temperature : Temperature) => {
      expect(temperature.failed).toBeFalsy();
      expect(temperature.city).toBe('Urubici');
      expect(temperature.temperature).toBeDefined();
      expect(temperature.temperature).toBe(3.14);
    });

    const req = httpMock.expectOne(`http://api.openweathermap.org/data/2.5/weather?id=${ubirici_code}&APPID=${environment.weather_api}&units=metric`);
    expect(req.request.method).toBe("GET");
    req.flush(return_ok);
  })));

  it('should fail to fetch', async(inject([WeatherService], (service: WeatherService) => {
    service.fetch_city(city_with_error_code).then((temperature : Temperature) => {
      expect(temperature.failed).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://api.openweathermap.org/data/2.5/weather?id=${city_with_error_code}&APPID=${environment.weather_api}&units=metric`);
    expect(req.request.method).toBe("GET");
    req.flush({}, return_error_code);
  })));

  it('should consult in the cache by Ubirici', async(inject([WeatherService], (service: WeatherService) => {
    cacheServiceSpy.getValue.and.returnValue(null);
    service.consult_city(ubirici_code).then((temperature : Temperature) => {
      expect(cacheServiceSpy.getValue.calls.mostRecent().returnValue).toBe(null);
      expect(temperature.temperature).not.toBe(3.14);
    });
  })));

});
