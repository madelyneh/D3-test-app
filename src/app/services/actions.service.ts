import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TimeSeries } from '../models/TimeSeries';
import { Seasonal } from '../models/Seasonal';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  timeseriesUrl = 'https://localhost:44395/api/timeseries/';
  seasonalUrl = 'https://localhost:44395/api/seasonal/';
  // seasonalData: Seasonal;
  timeSeriesData: TimeSeries;


  constructor(private httpClient: HttpClient) { }

      // Get Seasonal Request
  apiGetSeasonal(input: number): Observable < any > {
      const id: number = input;
      return this.httpClient.get(this.seasonalUrl + id);
  }
      // Get TimeSeries Request
  apiGetTimeSeries(input: number): Observable<any> {
    const id: number = input;
    return this.httpClient.get(this.timeseriesUrl + id);
    }


  sortSeasonalData(input) {
    const seasonalData: Seasonal = input;
    const filteredArrays: any = {
      weekArray: [],
      hourArray: [],
    };

    for (const [i, value] of seasonalData.weeklySeason.entries()) {
      filteredArrays.weekArray.push({
        x: i,
        y: value
      });
    }
    for (const [i, value] of seasonalData.hourlySeason.entries()) {
      filteredArrays.hourArray.push({
        x: i,
        y: value
      });
    }

    return filteredArrays;
  }

  seasonalProjection(data) {
    const jsonData = data;
    const week = jsonData.weeklySeason;
    const hour = jsonData.hourlySeason;



  }

}
