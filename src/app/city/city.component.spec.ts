import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CityComponent } from './city.component';
import { Temperature } from '../temperature';
import { WeatherService } from '../services/weather.service';

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;
  let weatherServiceSpy: jasmine.SpyObj<WeatherService>;

  beforeEach(async(() => {
    const spy = jasmine.createSpyObj('WeatherService', ['consult_city']);
    TestBed.configureTestingModule({
      declarations: [ CityComponent ],
      providers: [{ provide: WeatherService, useValue: spy }]
    })
    .compileComponents();
    weatherServiceSpy = TestBed.get(WeatherService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have no color if there is no temperature data', () => {
    expect(component.getFontColor()).toBe('');
    component.temperature = new Temperature();
    component.temperature.temperature = null;
    expect(component.getFontColor()).toBe('');
  });

  it('color should be blue when bellow 6', () => {
    component.temperature = new Temperature();
    component.temperature.temperature = 5.9;
    expect(component.getFontColor()).toBe('blue');
  });

  it('color should be orange when bellow 26', () => {
    component.temperature = new Temperature();
    component.temperature.temperature = 25.9;
    expect(component.getFontColor()).toBe('orange');
  });

  it('color should be red otherwise', () => {
    component.temperature = new Temperature();
    component.temperature.temperature = 26;
    expect(component.getFontColor()).toBe('red');
  });

  it('color should be red otherwise', () => {
    component.temperature = new Temperature();
    component.temperature.temperature = 26;
    expect(component.getFontColor()).toBe('red');
  });

  it('should show loader', () => {
    component.loading = true;
    fixture.detectChanges();
    const el : HTMLElement = fixture.nativeElement;
    let img = el.querySelector('img');
    expect(img).not.toBeNull();
    component.loading = false;
    fixture.detectChanges();
    img = el.querySelector('img');
    expect(img).toBeNull();
  });

  it('should show error', () => {
    let t = new Temperature();
    t.failed = true;
    component.temperature = t;
    fixture.detectChanges();
    const el : HTMLElement = fixture.nativeElement;
    let temp = el.querySelector('.city-temperature');
    expect(temp).toBeNull();
  });

  it('should show content', () => {
    let t = new Temperature();
    t.failed = true;
    component.temperature = t;
    fixture.detectChanges();
    const el : HTMLElement = fixture.nativeElement;
    let temp = el.querySelector('.city-temperature');
    expect(temp).toBeNull();
  });

});
