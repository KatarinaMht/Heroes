import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProposalsComponent } from './proposals.component';
import { ProposalEditComponent } from './components/proposal-edit/proposal-edit.component';
import { ProposalsPageComponent } from './proposals-page.component';

// const routes: Routes = [
//     // { path: '', redirectTo: '/proposals', pathMatch: 'full' },
//     { path: 'proposals',  component: ProposalsComponent },
//     { path: 'proposals/:id/edit',  component: ProposalEditComponent }
// ];

const routes: Routes = [
    {
        path: 'proposals-page',
        component: ProposalsPageComponent,
        children: [
            {
                path: '',
                component: ProposalsComponent,
                children: [
                    {
                        path: ':id',  
                        children: [
                            {
                                path: 'edit',
                                component: ProposalEditComponent,
                            }

                        ] 
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class ProposalsRoutingModule {}