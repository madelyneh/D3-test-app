import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SeasonalProjectionService {
  public apiSeasonal: any;
  public trendSlop: number;
  public trendPoint: number;

  constructor(private api: ApiService) { }

  getSlop() {
    this.api.getSeasonal().subscribe(data => {
      this.apiSeasonal = data;
    });
    return console.log(this.apiSeasonal);
  }

}
