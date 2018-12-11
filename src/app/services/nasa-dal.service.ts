import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NASAData } from '../models/nasa-data';

@Injectable({
  providedIn: 'root'
})
export class NasaDalService {
  constructor(private http: HttpClient) {}

  /**
   * GetNASAImage
   */
  public GetNASAImage() {
    const nasaEndpoint = 'https://api.nasa.gov/planetary/apod?api_key=DKase8DlK9V0JPjUGVNLbBZbTBNiNU2oUTwxE0yS';

    return this.http.get<NASAData>(nasaEndpoint);
  }
}
