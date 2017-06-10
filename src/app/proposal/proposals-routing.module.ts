import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProposalsComponent } from './proposals.component';
import { ProposalEditComponent } from './components/proposal-edit/proposal-edit.component';
import { ProposalsPageComponent } from './proposals-page.component';
import { UserManagement } from './components/user-management/user-management.component';

// const routes: Routes = [
//     // { path: '', redirectTo: '/proposals', pathMatch: 'full' },
//     { path: 'proposals',  component: ProposalsComponent },
//     { path: 'proposals/:id/edit',  component: ProposalEditComponent }
// ];

const routes: Routes = [
    {
        path: 'evaluations',
        component: ProposalsPageComponent,
        children: [
            {
                path: 'list',
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
            },
            {
                path: 'user-management',
                component: UserManagement
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class ProposalsRoutingModule {}