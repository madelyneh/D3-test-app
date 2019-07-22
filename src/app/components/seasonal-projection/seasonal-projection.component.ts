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
import { TimeSeries } from '../../models/TimeSeries';
import { DataModel } from '../../models/DataModel';
import { ActionsService } from '../../services/actions.service';
import { AllData } from '../../models/AllData';

@Component({
  selector: 'app-seasonal-projection',
  templateUrl: './seasonal-projection.component.html',
  styleUrls: ['./seasonal-projection.component.scss']
})
export class SeasonalProjectionComponent implements OnInit {
  public chart = new Chart(new XYGrid());
  public chartAssist: ChartAssist = new ChartAssist(this.chart);
  input: string;
  searchNum: number = Number(this.input) || 5;

  @Input() timeSeriesData: TimeSeries; seasonalData: Seasonal;

  allData: AllData = {
    TimeSeries: this.timeSeriesData,
    Seasonal: this.seasonalData
  };


  constructor(private api: ApiService) {}

  public ngOnInit() {

    this.api.getTS(this.searchNum).subscribe(data => {
      this.allData.TimeSeries = data;
    });

    this.api.getSeasonal(this.searchNum).subscribe(data => {
      this.allData.Seasonal = data;
      console.log(this.allData);
      return this.setChart(this.allData);
    });

  }

  setChart(allData: AllData) {

    // providing chartAssist colors and markers to LineAccessors will share them with the line chart
    const apiData = allData;
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
    const userInput = this.input;
    console.log(userInput);

    this.api.getTS(this.searchNum).subscribe(data => {
      this.allData.TimeSeries = data;
    });

    this.api.getSeasonal(this.searchNum).subscribe(data => {
      this.allData.Seasonal = data;
      return this.setChart(this.allData);
    });

  }

}

/* Chart data */
function loadChart(api: AllData) {
  const apiData: AllData = api;
  const format = "YYYY-MM-DDTHH:mm:ssZ";
  const seasonal: Seasonal = apiData.Seasonal;
  const timeSeries: TimeSeries = apiData.TimeSeries;
  const trendArray: any = [];
  const timeArray: any = [];
  const trendSlop: number = apiData.Seasonal.trendSlop;
  const trendPoint: number = apiData.Seasonal.trendPoint;

  for (const [i, value] of timeSeries.timeArray.entries()) {
    timeArray.push({
      x: moment(value, format),
      y: timeSeries.valueArray[i]
    });
  }

  for (const [i, value] of seasonal.weeklySeason.entries()) {
    trendArray.push({
      x: i,
      y: value
    });
  }
  // for (const [i, value] of seasonal.weeklySeason.entries()) {
  //   trendArray.push({
  //     x: value,
  //     y: (value * trendSlop) + trendPoint,
  //   });
  // }

  return [
    // {
    //     id: `${seasonal.entityID}`,
    //     name: `Seasonal ID (Week): ${seasonal.entityID}`,
    //     data: trendArray,
    // },
    {
      id: `TimeSeries: ${timeSeries.entityID}`,
      name: `TimeSeries`,
      data: timeArray,
    },


  ];
}
