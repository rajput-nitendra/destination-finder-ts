import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LandingPageComponent} from './components/landing-page/landing-page.component';
import {AirportSelectionComponent} from './components/airport-selection/airport-selection.component';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './module/material.module';
import {CacheInterceptor} from './interceptor/cache.interceptor';
import {MatProgressButtonsModule} from 'mat-progress-buttons';
import {DirtyErrorStateMatcherDirective} from './validators/dirty-error-state-matcher.directive';
import {ErrorStateMatcher, ShowOnDirtyErrorStateMatcher} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    AirportSelectionComponent,
    DirtyErrorStateMatcherDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    MatProgressButtonsModule
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    {provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
