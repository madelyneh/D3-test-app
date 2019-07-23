export interface AlertTable {
  position: number;
  name: string;
  features: Array<string>;
  asset: string;
  location: string;
  status: string;
  outages: number;
  checks: [{
    icon: string;
    num: number;
  }];
}
