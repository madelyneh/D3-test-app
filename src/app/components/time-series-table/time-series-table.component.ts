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
import { TimeSeries } from '../../models/TimeSeries';
import { Seasonal } from '../../models/Seasonal';
import moment from 'moment/moment';


@Component({
  selector: 'app-time-series-table',
  templateUrl: './time-series-table.component.html',
  styleUrls: ['./time-series-table.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TimeSeriesTableComponent implements OnInit {
  public chart = new Chart(new XYGrid());
  public chartAssist: ChartAssist = new ChartAssist(this.chart);
  public newArray: any = [];
  input: string;
  searchNum: number = Number(this.input) || 5;


  @Input() apiData: TimeSeries; apiDataS: Seasonal;

  constructor(private api: ApiService) {}

  public ngOnInit() {

    this.api.getSeasonal(this.searchNum).subscribe(data => {
      this.apiDataS = data;
      // console.log(`In ngOnInit w/ the api call. Data: ${JSON.stringify(this.apiDataS)}`);
    });

    // get call for the TimeSeries data
    this.api.getTS(this.searchNum).subscribe(data => {
      this.apiData = data;

      return this.setChart(this.apiData, this.apiDataS);
    });

  }

  setChart(apiTS: TimeSeries, apiSeasonal: Seasonal) {

    // providing chartAssist colors and markers to LineAccessors will share them with the line chart
    const apiData = apiTS;
    const apiDataS = apiSeasonal;
    const accessors = new LineAccessors(this.chartAssist.palette.standardColors, this.chartAssist.markers);
    const renderer = new LineRenderer();
    const scales: Scales = {
          x: new TimeScale(),
          y: new LinearScale(),
    };
    const seriesSet: IChartSeries<ILineAccessors>[] = loadChart(apiData, apiDataS).map(d => ({
          ...d,
          accessors,
          renderer,
          scales,
    }));

      // chart assist needs to be used to update data
    this.chartAssist.update(seriesSet);
  }

}


  // This sorts the data into the correct formate.
function loadChart(apiTS: TimeSeries, apiSeasonal: Seasonal) {
  const format = "YYYY-MM-DDTHH:mm:ssZ";
  const apiData: TimeSeries = apiTS;
  const apiDataS: Seasonal = apiSeasonal;
  const timeDataTS = apiData.timeArray;
  const valueDataTS = apiData.valueArray;
  const newArray: any = [];

  for (const [i, value] of timeDataTS.entries()) {
    newArray.push({
      x: moment(value, format),
      y: valueDataTS[i]
    });
  }
  console.log('•••: ------------------------------------');
  console.log('•••: loadChart -> newArray', newArray);
  console.log('•••: ------------------------------------');

  return [
    {
        id: `${apiData.entityID}`,
        name: `${apiData.valueName}`,
        data: newArray,
    },
    // {
    //   id: `Trend`,
    //   name: `Seasonal Trend Line`,
    //   data: getSeasonal(apiDataS),
    // },


  ];

}

/* Seasonal Chart data */
function getSeasonal(api: Seasonal) {
  const apiData: Seasonal = api;
  const weekArray: any = [];
  const trendArray: any = [];
  const trendSlop: number = apiData.trendSlop;
  const trendPoint: number = apiData.trendPoint;

  for (const [i, value] of apiData.weeklySeason.entries()) {
    weekArray.push({
      x: i,
      y: value
    });
  }
  for (const [i, value] of apiData.weeklySeason.entries()) {
    trendArray.push({
      x: value,
      y: (value * trendSlop) + trendPoint,
    });
  }

  return trendArray;
}

