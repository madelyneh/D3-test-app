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
import { SeasonalTableComponent } from '../seasonal-table/seasonal-table.component';

@Component({
  selector: 'app-seasonal-projection',
  templateUrl: './seasonal-projection.component.html',
  styleUrls: ['./seasonal-projection.component.scss']
})
export class SeasonalProjectionComponent implements OnInit {
  public chart = new Chart(new XYGrid());
  public chartAssist: ChartAssist = new ChartAssist(this.chart);
  title: string;

  @Input() apiDataS: any;

  constructor(private api: ApiService) {}

  public ngOnInit() {

    this.api.getSeasonal().subscribe(data => {
      this.apiDataS = data;
      // console.log(`In ngOnInit w/ the api call. Data: ${JSON.stringify(this.apiDataS)}`);
      return this.loadChart();
    });

  }

  loadChart() {

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

  onSubmit() {
    const userInput = this.title;
    console.log(userInput);
  }


}

/* Chart data */
function getData(api) {
  const format = 'YYYY-MM-DDTHH:mm:ssZ';
  const seasonalData: any = api;
  const newHourArray: any = [];
  const newWeekArray: any = [];
  const trendArray: any = [];
  const trendSlop: number = seasonalData.trendSlop;
  const trendPoint: number = seasonalData.trendPoint;
// FIXME make the projection line the same size as the other line

// tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < seasonalData.weeklySeason.length; i++) {
    trendArray.push({
      x: ((seasonalData.weeklySeason[i] / trendSlop) - trendPoint),
      y: (seasonalData.weeklySeason[i]),
    });
    }
  for (let i = 0; i < seasonalData.weeklySeason.length; i++) {
      newWeekArray.push({ x: Number(i), y: Number(seasonalData.weeklySeason[i])} );
  }
  console.log('•••: --------------------------------------');
  console.log('•••: getData -> trendArray', trendArray);
  console.log('•••: --------------------------------------');



  return [
        {
            id: `${seasonalData.seasonalityID}`,
            name: `Seasonal ID (Week): ${seasonalData.seasonalityID}`,
            data: newWeekArray,
        },
        {
            id: ` Trend: ${seasonalData.seasonalityID}`,
            name: `Seasonal Trend Slope`,
            data: trendArray,
        },
    ];
}

