import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [
    AppComponent,
    TimeSeriesTableComponent,
    SeasonalTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NuiModule,
    FdkLayoutModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: TRANSLATIONS_FORMAT, useValue: 'xlf' },
    { provide: MISSING_TRANSLATION_STRATEGY, useValue: MissingTranslationStrategy.Warning },
    { provide: TRANSLATIONS, useValue: '' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
