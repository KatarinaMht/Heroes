import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ProposalsComponent } from './proposals.component';
import { ProposalListComponent } from './components/proposal-list/proposal-list.component';
import { ProposalEditComponent } from './components/proposal-edit/proposal-edit.component';
import { ProposalsRoutingModule } from './proposals-routing.module';
import { ProposalsPageComponent } from './proposals-page.component';

@NgModule({
    imports: [ 
        CommonModule,
        SharedModule,
        ReactiveFormsModule ,
        ProposalsRoutingModule
    ],
    exports:  [ 
        ProposalsComponent,
        ProposalListComponent,
        ProposalEditComponent
    ],
    declarations: [ 
        ProposalsComponent, 
        ProposalListComponent,
        ProposalEditComponent,
        ProposalsPageComponent 
    ],
    providers: []
})

export class ProposalsModule { }