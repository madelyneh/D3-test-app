import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import {
  Chart,
  ChartAssist,
  IChartSeries,
  ILineAccessors,
  LineAccessors,
  LinearScale,
  LineRenderer,
  Scales,
  TimeScale,
  XYGrid
} from '@solarwinds/nova-bits';
import moment from 'moment/moment';
import { ApiService } from '../../services/api.service';
import { Seasonal } from '../../models/Seasonal';
import { DataModel } from '../../models/DataModel';

@Component({
  selector: 'app-seasonal-projection',
  templateUrl: './seasonal-projection.component.html',
  styleUrls: ['./seasonal-projection.component.scss']
})
export class SeasonalProjectionComponent implements OnInit {
  public chart = new Chart(new XYGrid());
  public chartAssist: ChartAssist = new ChartAssist(this.chart);
  title: string;

  @Input() apiDataS: Seasonal;

  constructor(private api: ApiService) {}

  public ngOnInit() {

    this.api.getSeasonal().subscribe(data => {
      this.apiDataS = data;
      // console.log(`In ngOnInit w/ the api call. Data: ${JSON.stringify(this.apiDataS)}`);
      return this.setChart(this.apiDataS);
    });

  }

  setChart(api: Seasonal) {

    // providing chartAssist colors and markers to LineAccessors will share them with the line chart
    const apiData = api;
    const accessors = new LineAccessors(this.chartAssist.palette.standardColors, this.chartAssist.markers);
    const renderer = new LineRenderer();
    const scales: Scales = {
          x: new LinearScale(),
          y: new LinearScale(),
    };
    const seriesSet: IChartSeries<ILineAccessors>[] = loadChart(apiData).map(d => ({
          ...d,
          accessors,
          renderer,
          scales,
    }));

      // chart assist needs to be used to update data
    this.chartAssist.update(seriesSet);
  }

  onSubmit() {
    const userInput = this.title;
    console.log(userInput);
  }

}

/* Chart data */
function loadChart(api: Seasonal) {
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

  // console.log('•••: ----------------------------------');
  // console.log('•••: loadChart -> apiData', apiData);
  // console.log('•••: ----------------------------------');

  // console.log('•••: --------------------------------------');
  // console.log('•••: loadChart -> weekArray', weekArray);
  // console.log('•••: --------------------------------------');
  // console.log('•••: ------------------------------------------------------------');
  // console.log('•••: loadChart -> apiData.trendArray', trendArray);
  // console.log('•••: ------------------------------------------------------------');
// FIXME I think I am using the wrong formula to ge this information.

  return [
    {
        id: `${apiData.seasonalityID}`,
        name: `Seasonal ID (Week): ${apiData.seasonalityID}`,
        data: weekArray,
    },
    {
      id: `Trend`,
      name: `Seasonal Trend Line`,
      data: trendArray,
    },


  ];
}
