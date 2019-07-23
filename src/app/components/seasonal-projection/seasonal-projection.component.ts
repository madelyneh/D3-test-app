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
    });

    this.api.getSeasonal(userInput).subscribe(data => {
      this.allData.Seasonal = data;
      return this.setChart(this.allData);
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
  const trendArray: any = [];
  const timeArray: any = [];
  const trendSlop: number = seasonal.trendSlop;
  const trendPoint: number = seasonal.trendPoint;
  const hour: any = seasonal.hourlySeason;
  const week: any = seasonal.weeklySeason;
  console.log('Chart has been updated');

  for (const [i, value] of timeSeries.timeArray.entries()) {
    timeArray.push({
      x: moment(value, format),
      y: timeSeries.valueArray[i]
    });
  }

  for (const [i, value] of timeSeries.timeArray.entries()) {
    let time = moment(value, format);
    let newTime = time.add(180, 'hour');
    trendArray.push({
      x: newTime,
      y:
        (trendSlop * valueArray[i]) + trendPoint +
        ((hour[i % hour.length])  + (week[i % week.length]))
    });

  }

  return [
    {
      id: `${timeSeries.entityID}`,
      name: `TimeSeries: ${timeSeries.entityID}`,
      data: timeArray,
    },
    {
      id: `Forecast ${seasonal.entityID}`,
      name: `Forecast: ${seasonal.entityID}`,
      data: trendArray,
    },
  ];
}

function seasonalProjection(allData) {
  const seasonalData: Seasonal = allData.Seasonal;
  const week: any[] = seasonalData.weeklySeason;
  const hour: any[] = seasonalData.hourlySeason;
  const trendSlope: number = seasonalData.trendSlop;
  const trendPoint: number = seasonalData.trendPoint;

  const timeSeriesData: TimeSeries = allData.TimeSeries;
  const timeArray: any[] = timeSeriesData.timeArray;
  const valueArray: any[] = timeSeriesData.valueArray;
  console.log('•••: -------------------------------------------------');
  console.log('•••: seasonalProjection -> valueArray', valueArray);
  console.log('•••: -------------------------------------------------');
  const yValues: any = [];


  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < valueArray.length; i++) {
    yValues.push((trendSlope * valueArray[i]) + trendPoint +
      ((valueArray[i] % hour.length) + (valueArray[i] % week.length)));
  }


}
