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
  selector: 'app-time-series-table',
  templateUrl: './time-series-table.component.html',
  styleUrls: ['./time-series-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeSeriesTableComponent implements OnInit {
  public chart = new Chart(new XYGrid());
  public seriesSet: IChartSeries<ILineAccessors>[];
  apiDataTS: any;
  public newArray: any = [];

  constructor(private api: ApiService) {
    // get call for the TimeSeries data
    this.api.getTS().subscribe(data => {
      this.apiDataTS = data;
      // console.log('•••: ------------------------------------------------------------------------------');
      // console.log('•••: TimeSeriesTableComponent -> constructor -> this.apiDataTS', this.apiDataTS);
      // console.log('•••: ------------------------------------------------------------------------------');

      return this.sortData();
    });

  }

  ngOnInit() {
  }

  // This sorts the data into the correct formate.
  sortData() {
    const timeDataTS = this.apiDataTS.timeArray;
    const valueDataTS = this.apiDataTS.valueArray;

// tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < timeDataTS.length; i++) {
      this.newArray.push({ x: i, y: valueDataTS[i]}, );
    }

    this.seriesSet = [{
      id: '1',
      name: 'TimeSeries',
      data: this.newArray,
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
