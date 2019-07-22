import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TimeSeries } from '../models/TimeSeries';
import { Seasonal } from '../models/Seasonal';
import { AllData } from '../models/AllData';
import { ApiService } from './api.service';
import { Time } from '@angular/common';
import { all } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ActionsService {
  timeseriesUrl = 'https://localhost:44395/api/timeseries/';
  seasonalUrl = 'https://localhost:44395/api/seasonal/';
  // seasonalData: Seasonal;
  timeSeriesData: TimeSeries;
  seasonalData: Seasonal;
  allData: AllData;


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



}
