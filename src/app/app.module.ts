import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }  from './app.component';
import { ProposalsComponent } from './proposal/proposals.component';
import { ProposalListComponent } from './proposal/proposal-list/proposal-list.component';


@NgModule({
  imports: [ 
      BrowserModule,
      FormsModule,
      AppRoutingModule
    ],
  declarations: [ 
      AppComponent,
      ProposalsComponent,
      ProposalListComponent
    ],
  providers: [
    ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }
