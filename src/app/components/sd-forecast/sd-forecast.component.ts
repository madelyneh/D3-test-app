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
  selector: 'app-sd-forecast',
  templateUrl: './sd-forecast.component.html',
  styleUrls: ['./sd-forecast.component.scss']
})

export class SDForecastComponent implements OnInit {

  public chart = new Chart(new XYGrid());
  public chartAssist: ChartAssist = new ChartAssist(this.chart);
  input: string;
  searchNum: number = Number(this.input);

  @Input() timeSeriesData: TimeSeries; seasonalData: Seasonal;

  allData: AllData = {
    TimeSeries: this.timeSeriesData,
    Seasonal: this.seasonalData
  };

  constructor(private api: ApiService) {}

  public ngOnInit() {

    this.api.getTS(this.searchNum).subscribe(data => {
      this.allData.TimeSeries = data;
      this.api.getSeasonal(this.searchNum).subscribe(dataS => {
        this.allData.Seasonal = dataS;
        return this.setChart(this.allData);
      });
    });

  }

  setChart(allData: AllData) {

    // providing chartAssist colors and markers to LineAccessors will share them with the line chart
    const apiData = allData;
    const accessors = new LineAccessors(this.chartAssist.palette.standardColors, this.chartAssist.markers);
    const renderer = new LineRenderer();
    const scales: Scales = {
          x: new TimeScale(),
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
    const userInput: number = Number(this.input);
    console.log(userInput);
    this.input = ' ',

    this.api.getTS(userInput).subscribe(data => {
      this.allData.TimeSeries = data;
      this.api.getSeasonal(userInput).subscribe(data2 => {
        this.allData.Seasonal = data2;
        return this.setChart(this.allData);
      });
    });
  }

}

/* Chart data */
function loadChart(api: AllData) {
  const apiData: AllData = api;
  const format = 'YYYY-MM-DDTHH:mm:ssZ';
  const seasonal: Seasonal = apiData.Seasonal;
  const timeSeries: TimeSeries = apiData.TimeSeries;
  const valueArray: number[] = timeSeries.valueArray;
  const highSDArray: any = [];
  const lowSDArray: any = [];
  const timeArray: any = [];
  const trendSlop: number = seasonal.trendSlop;
  const trendPoint: number = seasonal.trendPoint;
  const hour: any = seasonal.hourlySeason;
  const week: any = seasonal.weeklySeason;
  console.log('Chart has been updated');

  for (const [i, value] of timeSeries.timeArray.entries()) {
    timeArray.push({
      x: moment(value, format),
      y: valueArray[i]
    });
  }

  for (const [i, value] of timeSeries.timeArray.entries()) {
    highSDArray.push({
      x: moment(value, format),
      y: trendPoint + seasonal.strandardDeviation,
    });
  }

  for (const [i, value] of timeSeries.timeArray.entries()) {
    lowSDArray.push({
      x: moment(value, format),
      y: trendPoint - seasonal.strandardDeviation,
    });
  }


  return [
    {
      id: `${timeSeries.entityID}`,
      name: `TimeSeries: ${timeSeries.entityID}`,
      data: timeArray,
    },
    {
      id: `Standard Deviation H ${seasonal.entityID}`,
      name: `Standard Deviation H: ${seasonal.entityID}`,
      data: highSDArray,
    },
    {
      id: `Standard Deviation L ${seasonal.entityID}`,
      name: `Standard Deviation  L: ${seasonal.entityID}`,
      data: lowSDArray,
    },

  ];
}
