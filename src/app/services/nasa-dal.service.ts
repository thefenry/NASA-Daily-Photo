import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NASAData } from '../models/nasa-data';

@Injectable({
  providedIn: 'root'
})
export class NasaDalService {
  constructor(private http: HttpClient) {}

  /**
   * GetNASAImage
   */
  public GetNASAImage(date: string) {
    const nasaEndpoint = 'https://api.nasa.gov/planetary/apod';
    const apiKey = 'DKase8DlK9V0JPjUGVNLbBZbTBNiNU2oUTwxE0yS';

    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('api_key', apiKey);
    params = params.append('date', date);

    return this.http.get<NASAData>(nasaEndpoint, {params: params});
  }
}
