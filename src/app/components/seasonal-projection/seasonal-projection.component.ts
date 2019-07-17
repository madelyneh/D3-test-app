import { Component, OnInit } from '@angular/core';
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
import { SeasonalTableComponent } from '../seasonal-table/seasonal-table.component';

@Component({
  selector: 'app-seasonal-projection',
  templateUrl: './seasonal-projection.component.html',
  styleUrls: ['./seasonal-projection.component.scss']
})
export class SeasonalProjectionComponent implements OnInit {

  public apiDataS: any;

  constructor(private api: ApiService) {

    // get call for the Seasonal data
    this.api.getSeasonal().subscribe(data => {
      this.apiDataS = data;
      console.log(data);
      return getData(this.apiDataS);
    });

  }

  public chart = new Chart(new XYGrid());
  public chartAssist: ChartAssist = new ChartAssist(this.chart);
  // public data: SeasonalTableComponent;


  public ngOnInit() {
      // providing chartAssist colors and markers to LineAccessors will share them with the line chart
      const accessors = new LineAccessors(this.chartAssist.palette.standardColors, this.chartAssist.markers);
      const renderer = new LineRenderer();
      const scales: Scales = {
          x: new TimeScale(),
          y: new LinearScale(),
      };

      const seriesSet: IChartSeries<ILineAccessors>[] = getData(this.apiDataS).map(d => ({
          ...d,
          accessors,
          renderer,
          scales,
      }));

      // chart assist needs to be used to update data
      this.chartAssist.update(seriesSet);
  }


}
// TODO Pick back up here. Trying to give the data to the getData() function. It's failing because the calls are happening the same time.
/* Chart data */
function getData(data) {
  const format = 'YYYY-MM-DDTHH:mm:ssZ';
  const apiData = data;
  console.log("TCL: getData -> apiData", apiData);
  // ${apiData.seasonalID}

  return [
        {
            id: `seasonal 1`,
            name: `Seasonal ID: ?`,
            data: [
                { x: moment('2016-12-25T15:14:29.909Z', format), y: 30 },
                { x: moment('2016-12-27T15:14:29.909Z', format), y: 95 },
                { x: moment('2016-12-29T15:14:29.909Z', format), y: 15 },
                { x: moment('2016-12-31T15:14:29.909Z', format), y: 60 },
                { x: moment('2017-01-03T15:14:29.909Z', format), y: 35 },
            ],
        },
        {
            id: 'series-2',
            name: 'Series 2',
            data: [
                { x: moment('2016-12-25T15:14:29.909Z', format), y: 60 },
                { x: moment('2016-12-27T15:14:29.909Z', format), y: 40 },
                { x: moment('2016-12-29T15:14:29.909Z', format), y: 70 },
                { x: moment('2016-12-31T15:14:29.909Z', format), y: 45 },
                { x: moment('2017-01-03T15:14:29.909Z', format), y: 90 },
            ],
        },
    ];
}

