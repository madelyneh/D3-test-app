import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':  '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  timeseriesUrl = 'https://localhost:44395/api/timeseries/49';
  seasonalUrl = 'https://localhost:44395/api/seasonal/5';


  constructor(private httpClient: HttpClient) { }

    // Get TimeSeries Request
    getTS(): Observable<any> {
      return this.httpClient.get(this.timeseriesUrl);
    }
      // Get Seasonal Request
      getSeasonal(): Observable<any> {
        return this.httpClient.get(this.seasonalUrl);
      }

}
