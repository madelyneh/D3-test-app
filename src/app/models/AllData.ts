export class AllData {
  TimeSeries: {
    entityID: number;
    valueName: string;
    dateTimeName: string;
    valueArray: Array<number>;
    timeArray: Array<number>;
  };
  Seasonal: {
    entityID: number;
    hourlySeason: Array<number>;
    seasonalityID: number;
    strandardDeviation: number;
    trendPoint: number;
    trendSlop: number;
    weeklySeason: Array<number>;
  };
}
