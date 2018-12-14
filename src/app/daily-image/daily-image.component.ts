import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { NASAData } from '../models/nasa-data';
import { NasaDalService } from '../services/nasa-dal.service';
import { CacheService } from '../services/cache.service';

import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'YYYY MMMM DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMM YYYY'
  }
};

@Component({
  selector: 'app-daily-image',
  templateUrl: './daily-image.component.html',
  styleUrls: ['./daily-image.component.less'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class DailyImageComponent implements OnInit {
  public showHDImage = false;
  public dateOutOfRange = false;

  public minimumDate: Date;
  public maximumDate: Date;
  public todaysDate: FormControl;
  public nasaImageData: NASAData;

  constructor(private nasaDataService: NasaDalService, private cacheService: CacheService) {}

  ngOnInit() {
    this.setDates();

    this.showNASAImage(moment().format('YYYY-MM-DD'));
  }

  public getImage(newValue: any) {
    const newDateString = newValue.value.format('YYYY-MM-DD');

    if (this.isDateValid(newValue.value.toDate())) {
      this.showNASAImage(newDateString);
      this.dateOutOfRange = false;
    } else {
      this.dateOutOfRange = true;
    }
  }

  private isDateValid(newDate: Date) {
    return newDate >= this.minimumDate && this.maximumDate >= newDate;
  }

  public toggleImageQuality(): void {
    this.showHDImage = !this.showHDImage;
  }

  private setDates(): void {
    this.todaysDate = new FormControl(moment());
    this.maximumDate = moment().toDate();
    this.minimumDate = moment()
      .startOf('date')
      .subtract(2, 'months')
      .toDate();
  }

  private showNASAImage(date: string): void {
    this.cacheService
      .get(date, this.nasaDataService.GetNASAImage(date))
      .subscribe((data: NASAData) => this.setNASAData(data), error => this.HandleRequestError(error));
  }

  private setNASAData(data: NASAData): void {
    this.nasaImageData = data;
  }

  private HandleRequestError(error: any): void {
    alert('Something when wrong. Please refresh the page and try again.');
    console.log(error);
  }
}
