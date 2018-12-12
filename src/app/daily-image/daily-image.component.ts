import { Component, OnInit } from '@angular/core';
import { NasaDalService } from '../services/nasa-dal.service';
import { NASAData } from '../models/nasa-data';

@Component({
  selector: 'app-daily-image',
  templateUrl: './daily-image.component.html',
  styleUrls: ['./daily-image.component.less']
})
export class DailyImageComponent implements OnInit {
  public minimumDate: string;
  public maximumDate: string;
  public todaysDate: string;

  public nasaImageData: NASAData;
  public imageDate: string;

  constructor(private nasaDataService: NasaDalService) {}

  ngOnInit() {
    this.setMaximumDate();
    this.setMinimumDate();

    this.setTodaysDate();
    this.showNASAImage(this.todaysDate);
  }

  /**
    * getImage
    newValue:any */
  public getImage(newValue: any) {
    this.showNASAImage(newValue.target.value);
  }

  private setTodaysDate(): void {
    this.todaysDate = this.getStringDate();
  }

  private setMinimumDate(): void {
    this.minimumDate = this.getStringDate(-2);
  }

  private setMaximumDate(): void {
    this.maximumDate = this.getStringDate();
  }

  private showNASAImage(date: string): void {
    this.nasaDataService
      .GetNASAImage(date)
      .subscribe((data: NASAData) => this.setNASAImageData(data), error => this.HandleRequestError(error));
  }

  private setNASAImageData(data: NASAData): void {
    this.nasaImageData = data;
    this.setImageDate(data.date);
  }

  private setImageDate(imageDate: string) {
    const currentDate = new Date(imageDate);

    const monthString = currentDate.toLocaleString('en-us', { month: 'long' });
    this.imageDate = currentDate.getFullYear() + ' ' + monthString + ' ' + currentDate.getDate();
  }

  private getStringDate(monthDifference = 0): string {
    const todaysDate = new Date();

    todaysDate.setMonth(todaysDate.getMonth() + monthDifference);

    const month = todaysDate.getMonth() + 1;
    const monthString = month < 10 ? '0' + month : month;
    const day = todaysDate.getDate();
    const dayString = day < 10 ? '0' + day : day;

    return todaysDate.getFullYear() + '-' + monthString + '-' + dayString;
  }

  private HandleRequestError(error: any): void {
    alert('Something when wrong. Please refresh the page and try again.');
    console.log(error);
  }
}