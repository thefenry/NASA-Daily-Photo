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
  public nasaImageData: NASAData;

  constructor(private nasaDataService: NasaDalService) {}

  ngOnInit() {
    this.minimumDate = '2018-24-11';
    this.maximumDate = '2018-12-11';

    this.showNASAImage();
  }

  private showNASAImage(): void {
    this.nasaDataService
      .GetNASAImage()
      .subscribe((data: NASAData) => this.setNASAImageData(data), error => this.HandleRequestError(error));
  }

  private setNASAImageData(data: NASAData): void {
    this.nasaImageData = data;
  }

  HandleRequestError(error: any): void {
    alert('Something when wrong. Please refresh the page and try again.');
    console.log(error);
  }
}
