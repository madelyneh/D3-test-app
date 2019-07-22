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
import moment from 'moment/moment';
import { ApiService } from '../../services/api.service';
import { Seasonal } from '../../models/Seasonal';
import { TimeSeries } from '../../models/TimeSeries';
import { ActionsService } from '../../services/actions.service';
import { AllData } from '../../models/AllData';

@Component({
  selector: 'app-seasonal-table',
  templateUrl: './seasonal-table.component.html',
  styleUrls: ['./seasonal-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SeasonalTableComponent implements OnInit {
  public chart = new Chart(new XYGrid());
  public chartAssist: ChartAssist = new ChartAssist(this.chart);
  public newArray: any = [];
  input: string;
  searchNum: number = Number(this.input);


  @Input() timeSeriesData: TimeSeries; seasonalData: Seasonal;

  allData: AllData = {
    TimeSeries: this.timeSeriesData,
    Seasonal: this.seasonalData
  };



  constructor(private api: ApiService) {}

  public ngOnInit() {

    this.api.getSeasonal(this.searchNum).subscribe(data => {
      this.allData.Seasonal = data;
    });

    // get call for the TimeSeries data
    this.api.getTS(this.searchNum).subscribe(data => {
      this.allData.TimeSeries = data;

      return this.setChart(this.allData);
    });

  }

  setChart(allData: AllData) {

    // providing chartAssist colors and markers to LineAccessors will share them with the line chart
    const apiData = allData;
    const timeSeriesData = apiData.TimeSeries;
    const seasonalData = apiData.Seasonal;
    const accessors = new LineAccessors(this.chartAssist.palette.standardColors, this.chartAssist.markers);
    const renderer = new LineRenderer();
    const scales: Scales = {
          x: new TimeScale(),
          y: new LinearScale(),
    };
    const seriesSet: IChartSeries<ILineAccessors>[] = loadChart(timeSeriesData, seasonalData).map(d => ({
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


  // This sorts the data into the correct formate.
function loadChart(apiTS: TimeSeries, apiSeasonal: Seasonal) {
  const format = 'YYYY-MM-DDTHH:mm:ssZ';
  const timeSeriesData: TimeSeries = apiTS;
  const seasonalData: Seasonal = apiSeasonal;
  const timeDataTS = timeSeriesData.timeArray;
  const valueDataTS = timeSeriesData.valueArray;
  const newArray: any = [];
  const newWave: any = [];

  console.log('Chart has been updated');

  for (const [i, value] of timeDataTS.entries()) {
    newArray.push({
      x: moment(value, format),
      y: valueDataTS[i]
    });
  }
  for (const [i, value] of timeDataTS.entries()) {
    newWave.push({
      x: i,
      y: (1 * Math.sin(i)) + (3 * Math.sin(i / 5))
    });
  }

  // console.log(1 * (Math.sin(value / 1) + 3 * Math.sin(value / 5)));


  return [
    // {
    //   id: `${timeSeriesData.entityID}`,
    //   name: `${timeSeriesData.valueName}`,
    //   data: newArray,
    // },
    {
      id: `Wave ${timeSeriesData.entityID}`,
      name: `Wave`,
      data: newWave,
    },

  ];

}

/* Seasonal Chart data */
function getSeasonal(api: Seasonal) {
  const timeSeriesData: Seasonal = api;
  const weekArray: any = [];
  const trendArray: any = [];
  const trendSlop: number = timeSeriesData.trendSlop;
  const trendPoint: number = timeSeriesData.trendPoint;

  for (const [i, value] of timeSeriesData.weeklySeason.entries()) {
    weekArray.push({
      x: i,
      y: value
    });
  }
  for (const [i, value] of timeSeriesData.weeklySeason.entries()) {
    trendArray.push({
      x: value,
      y: (value * trendSlop) + trendPoint,
    });
  }

  return trendArray;
}
