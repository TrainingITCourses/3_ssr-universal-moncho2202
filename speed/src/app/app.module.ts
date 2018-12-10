import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearcherContainerComponent } from './searcher-container.component';
import { SearchOptionsPresenterComponent } from './search-options-presenter.component';
import { SearchValuesPresenterComponent } from './search-values-presenter.component';
import { SearchResultPresenterComponent } from './search-result-presenter.component';

@NgModule({
  declarations: [
    AppComponent,
    SearcherContainerComponent,
    SearchOptionsPresenterComponent,
    SearchValuesPresenterComponent,
    SearchResultPresenterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
