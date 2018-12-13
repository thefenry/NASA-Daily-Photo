import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { DailyImageComponent } from './daily-image/daily-image.component';
import { NasaDalService } from './services/nasa-dal.service';
import { CacheService } from './services/cache.service';

@NgModule({
  declarations: [AppComponent, DailyImageComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [NasaDalService, CacheService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
