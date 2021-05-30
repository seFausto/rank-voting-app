import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './share/material.module';

import { AppComponent } from './app.component';
import { VotesComponent } from './votes/votes.component';




@NgModule({
  declarations: [
    AppComponent,
    VotesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
