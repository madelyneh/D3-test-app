import { Component, OnInit } from '@angular/core';
import { ActionsService } from '../../services/actions.service';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TimeSeries } from '../../models/TimeSeries';
import { Seasonal } from '../../models/Seasonal';
import { AllData } from '../../models/AllData';

@Component({
  selector: 'app-filler',
  templateUrl: './filler.component.html',
  styleUrls: ['./filler.component.scss']
})
export class FillerComponent implements OnInit {
  input: any = 5;
  seasonalData: Seasonal;
  timeSeriesData: TimeSeries;
  filteredArray: any[];
  allData: AllData = {
    TimeSeries: this.timeSeriesData,
    Seasonal: this.seasonalData
  };

  constructor(public actions: ActionsService) {
  }

  ngOnInit() {

    this.actions.apiGetTimeSeries(this.input).subscribe(timeData => {
      this.allData.TimeSeries = timeData;
    });
    this.actions.apiGetSeasonal(this.input).subscribe(seasonData => {
      this.allData.Seasonal = seasonData;
    });
    // this.getInfo();


  }

  getInfo(): any {
    console.log('•••: --------------------------------------------------');
    console.log('•••: FillerComponent -> this.allData', this.allData);
    console.log('•••: --------------------------------------------------');
  }
  // getInfo(input) {
  //   let seasonalData: Seasonal;
  //   let timeSeriesData: TimeSeries;
  //   const allData: AllData = {
  //     TimeSeries: timeSeriesData,
  //     Seasonal: seasonalData
  //   };

  //   this.actions.apiGetTimeSeries(input).subscribe(timeData => {
  //     allData.TimeSeries = timeData;
  //   });

  //   this.actions.apiGetSeasonal(input).subscribe(seasonData => {
  //     allData.Seasonal = seasonData;
  //     console.log(allData);

  //   });
  // }

}
