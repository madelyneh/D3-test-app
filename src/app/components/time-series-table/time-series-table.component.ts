import { Component, OnInit, Input, Inject, EventEmitter, Output  } from '@angular/core';
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
    XYGrid,
    ToastService
} from '@solarwinds/nova-bits';
import { ApiService } from '../../services/api.service';
import { TimeSeries } from '../../models/TimeSeries';
import { Seasonal } from '../../models/Seasonal';
import { AllData } from '../../models/AllData';
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
  searchNum: number = Number(this.input);


  @Input() timeSeriesData: TimeSeries; seasonalData: Seasonal;

  allData: AllData = {
    TimeSeries: this.timeSeriesData,
    Seasonal: this.seasonalData
  };

  constructor(private api: ApiService, @Inject(ToastService) public toastService: ToastService) {}

  public ngOnInit() {

    this.api.getSeasonal(this.searchNum).subscribe(data => {
      this.allData.Seasonal = data;
      this.api.getTS(this.searchNum).subscribe(data2 => {
        this.allData.TimeSeries = data2;
        return this.setChart(this.allData);
      });
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

  public onSearch(value: string) {
    const userInput: number = Number(value);
    console.log(userInput);

    this.api.getTS(userInput).subscribe(data => {
      this.allData.TimeSeries = data;
      this.api.getSeasonal(userInput).subscribe(data2 => {
        this.allData.Seasonal = data2;
        return this.setChart(this.allData);
      });
    });
  }

  public onCancel(value: string) {
    this.toastService.success({message: `OnCancel triggered. Current value is: ${value}`});
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
  console.log('Chart has been updated');
  for (const [i, value] of timeDataTS.entries()) {
    newArray.push({
      x: moment(value, format),
      y: valueDataTS[i]
    });
  }

  return [
    {
        id: `${timeSeriesData.entityID}`,
        name: `${timeSeriesData.valueName}`,
        data: newArray,
    },
  ];
}
