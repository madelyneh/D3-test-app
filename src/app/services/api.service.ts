import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TimeSeries } from '../models/TimeSeries';
import { Seasonal } from '../models/Seasonal';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin':  '*'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  timeseriesUrl = 'https://localhost:44395/api/timeseries/';
  seasonalUrl = 'https://localhost:44395/api/seasonal/';

  constructor(private httpClient: HttpClient) { }

    // Get TimeSeries Request
  getTS(input: number): Observable<any> {
    const inputNum: number = input || 5;
    return this.httpClient.get(this.timeseriesUrl + inputNum);
    }
    // Get Seasonal Request
  getSeasonal(input: number): Observable<any> {
    const inputNum: number = input || 5;
    return this.httpClient.get(this.seasonalUrl + inputNum);
    }
}
