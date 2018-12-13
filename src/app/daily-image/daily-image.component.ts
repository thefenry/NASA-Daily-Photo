import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NASAData } from '../models/nasa-data';
import { NasaDalService } from '../services/nasa-dal.service';
import { CacheService } from '../services/cache.service';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-daily-image',
  templateUrl: './daily-image.component.html',
  styleUrls: ['./daily-image.component.less']
})
export class DailyImageComponent implements OnInit {
  public showHDImage = false;
  public dateOutOfRange = false;

  public minimumDate: string;
  public maximumDate: string;
  public todaysDate: string;
  public nasaImageData: NASAData;

  constructor(
    private nasaDataService: NasaDalService,
    private cacheService: CacheService,
    private datepipe: DatePipe,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.setBasicDates();
    this.setMinimumDate();

    this.showNASAImage(this.todaysDate);
  }

  public getImage(newValue: any) {
    const newDateString = newValue.target.value;
    const newDate = new Date(newDateString);
    if (
      newDate >= new Date(this.minimumDate) &&
      new Date(this.maximumDate) >= newDate
    ) {
      this.showNASAImage(newDateString);
      this.dateOutOfRange = false;
    } else {
      this.dateOutOfRange = true;
    }
  }

  public toggleImageQuality(): void {
    this.showHDImage = !this.showHDImage;
  }

  private setBasicDates(): void {
    const date = new Date();
    this.todaysDate = this.datepipe.transform(date, 'yyyy-MM-dd');
    this.maximumDate = this.datepipe.transform(date, 'yyyy-MM-dd');
  }

  private setMinimumDate(): void {
    this.minimumDate = this.dateService.getStringDate(-2);
  }

  private showNASAImage(date: string): void {
    this.cacheService
      .get(date, this.nasaDataService.GetNASAImage(date))
      .subscribe(
        (data: NASAData) => this.setNASAData(data),
        error => this.HandleRequestError(error)
      );
  }

  private setNASAData(data: NASAData): void {
    this.nasaImageData = data;
  }

  private HandleRequestError(error: any): void {
    alert('Something when wrong. Please refresh the page and try again.');
    console.log(error);
  }
}
