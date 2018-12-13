import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { NASAData } from '../models/nasa-data';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class NasaDalService {
  constructor(private http: HttpClient) {}

  /**
   * GetNASAImage
   */
  public GetNASAImage(date: string) {
    const nasaEndpoint = environment.dataUrl;
    const apiKey = environment.apiKey;

    // Begin assigning parameters
    const params = this.setQueryParameters(apiKey, date);

    return this.http.get<NASAData>(nasaEndpoint, { params: params });
  }

  private setQueryParameters(apiKey: string, date: string): HttpParams {
    let params = new HttpParams();
    params = params.append('api_key', apiKey);
    params = params.append('date', date);
    return params;
  }
}
