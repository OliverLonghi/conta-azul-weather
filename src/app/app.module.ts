import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TopbarComponent } from './topbar/topbar.component';
import { CityComponent } from './city/city.component';
import { WeatherService } from './services/weather.service';
import { CacheService } from './services/cache.service';

@NgModule({
  declarations: [
    AppComponent,
    TopbarComponent,
    CityComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [WeatherService, CacheService],
  bootstrap: [AppComponent]
})
export class AppModule { }
