export interface DataModel {
  chartData: {
    x: number,
    y: number
  };
  anotherLayout: [{
    name: string,
    id: number,
    value: Array<number>
  }];
}
