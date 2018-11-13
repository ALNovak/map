import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { H21MapsModule } from './maps/h21-maps/h21-maps.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    H21MapsModule
  ],
  providers: [],
  bootstrap: [AppComponent,
  ]
})
export class AppModule { }
