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
  filteredArray: any[];

  constructor(public actions: ActionsService) { }

  ngOnInit() {
    // this.actions.sortData(this.input).subscribe(data => {
    //   this.filteredArray = data;
    //   console.log(this.filteredArray);
    // });
    this.actions.apiGetSeasonal(Number(this.input)).subscribe(data => {
      this.seasonalData = data;
      this.getInfo(this.seasonalData);
    });


  }

  getInfo(input) {
    console.log(input);

    console.log(this.actions.sortSeasonalData(input));
  }

}
