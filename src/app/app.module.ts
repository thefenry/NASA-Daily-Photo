import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { DailyImageComponent } from './daily-image/daily-image.component';
import { NasaDalService } from './services/nasa-dal.service';
import { CacheService } from './services/cache.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatFormFieldModule, MatInputModule} from '@angular/material';

@NgModule({
  declarations: [AppComponent, DailyImageComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [NasaDalService, CacheService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
