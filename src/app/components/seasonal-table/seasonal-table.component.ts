import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
    Chart,
    ChartAssist,
    ChartTooltipsPlugin,
    IChartSeries,
    ILineAccessors,
    LineAccessors,
    LinearScale,
    LineRenderer,
    Scales,
    TimeScale,
    XYGrid
} from '@solarwinds/nova-bits';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-seasonal-table',
  templateUrl: './seasonal-table.component.html',
  styleUrls: ['./seasonal-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SeasonalTableComponent implements OnInit {
  public chart = new Chart(new XYGrid());
  public seriesSet: IChartSeries<ILineAccessors>[];
  public apiDataS: any;
  public newHourArray: any = [];
  public newWeekArray: any = [];
  public trendSlop: number;
  public trendPoint: number;
  public seasonalHour: any;
  public seasonalWeek: any;

  constructor(private api: ApiService) {

    // get call for the Seasonal data
    this.api.getSeasonal().subscribe(data => {
      this.apiDataS = data;
      return this.sortData();
    });

  }

  ngOnInit() {
  }

  sortData() {
    this.seasonalHour = this.apiDataS.hourlySeason;
    this.seasonalWeek = this.apiDataS.weeklySeason;
    this.trendSlop = this.apiDataS.trendSlop;
    this.trendPoint = this.apiDataS.trendPoint;

// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.seasonalHour.length; i++) {
      this.newHourArray.push({ x: i, y: this.seasonalHour[i]}, );
    }
    for (let i = 0; i < this.seasonalWeek.length; i++) {
      this.newWeekArray.push({ x: i, y: this.seasonalWeek[i]}, );
    }

    // console.log(this.trendPoint);

    this.seriesSet = [{
      id: `${this.apiDataS.entityID}`,
      name: 'TimeSeries',
      data: this.newWeekArray,
      scales: {
        x: new LinearScale(),
        y: new LinearScale(),
      },
      renderer: new LineRenderer(),
      accessors: new LineAccessors(),
    }];

    this.chart.update(this.seriesSet);

  }

}
