import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ProposalsComponent } from './components/proposals.component';
import { ProposalListComponent } from './proposal-list/proposal-list.component';
import { ProposalEditComponent } from './proposal-edit/proposal-edit.component';

@NgModule({
    imports: [ 
        CommonModule,
        SharedModule 
    ],
    exports:  [ 
        ProposalsComponent,
        ProposalListComponent,
        ProposalEditComponent
    ],
    declarations: [ 
        ProposalsComponent, 
        ProposalListComponent,
        ProposalEditComponent 
    ],
    providers: []
})

export class ProposalsModule { }