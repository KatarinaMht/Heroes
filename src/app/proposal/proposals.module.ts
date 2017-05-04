import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProposalsComponent } from './components/proposals.component';
import { ProposalListComponent } from './proposal-list/proposal-list.component';

@NgModule({
    imports: [ 
        CommonModule,
        SharedModule 
    ],
    exports:  [ 
        ProposalsComponent,
        ProposalListComponent
    ],
    declarations: [ 
        ProposalsComponent, 
        ProposalListComponent 
    ],
    providers: []
})

export class ProposalsModule { }