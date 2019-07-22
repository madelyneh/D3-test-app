import { Component, OnInit } from '@angular/core';
import { ActionsService } from '../../services/actions.service';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TimeSeries } from '../../models/TimeSeries';
import { Seasonal } from '../../models/Seasonal';

@Component({
  selector: 'app-filler',
  templateUrl: './filler.component.html',
  styleUrls: ['./filler.component.scss']
})
export class FillerComponent implements OnInit {
  input = '5';
  seasonalData: Seasonal;
  timeSeriesData: TimeSeries;
  filteredArray: any[];
  bothData: any;

  constructor(public actions: ActionsService) {
  }

  ngOnInit() {

    this.actions.apiGetTimeSeries(Number(this.input)).subscribe(data => {
      this.timeSeriesData = data;
    });
    this.actions.apiGetSeasonal(Number(this.input)).subscribe(data => {
      this.seasonalData = data;
    });
    this.actions.apiGetBoth(Number(this.input)).subscribe(data => {
      this.bothData = data;
      console.log('•••: ----------------------------------------------------------------');
      console.log('•••: FillerComponent -> ngOnInit -> this.bothData', data);
      console.log('•••: ----------------------------------------------------------------');
    });


  }



  getInfo(seasonal, timeSeries) {

    console.log(this.actions.seasonalProjection(seasonal, timeSeries));
  }

}
