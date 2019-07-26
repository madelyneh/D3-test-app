import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule, TRANSLATIONS, MissingTranslationStrategy, TRANSLATIONS_FORMAT } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MISSING_TRANSLATION_STRATEGY } from '@ngx-translate/i18n-polyfill';
import { NuiModule } from '@solarwinds/nova-bits';
import { FdkLayoutModule } from '@solarwinds/fusion-layout';
import { TimeSeriesTableComponent } from './components/time-series-table/time-series-table.component';
import { SeasonalTableComponent } from './components/seasonal-table/seasonal-table.component';
import { SeasonalProjectionComponent } from './components/seasonal-projection/seasonal-projection.component';
import { AllAlertsTableComponent } from './components/all-alerts-table/all-alerts-table.component';
import { GridComponent } from './components/layout/grid/grid.component';
import { FillerComponent } from './components/filler/filler.component';
import { SDForecastComponent } from './components/sd-forecast/sd-forecast.component';
import { TrendLineComponent } from './components/trend-line/trend-line.component';

@NgModule({
  declarations: [
    AppComponent,
    TimeSeriesTableComponent,
    SeasonalTableComponent,
    SeasonalProjectionComponent,
    AllAlertsTableComponent,
    GridComponent,
    FillerComponent,
    SDForecastComponent,
    TrendLineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NuiModule,
    FdkLayoutModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
    { provide: MISSING_TRANSLATION_STRATEGY, useValue: MissingTranslationStrategy.Warning },
    { provide: TRANSLATIONS, useValue: '' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
