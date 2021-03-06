import { LoginComponent } from './shared/components/login/login.component';
import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProposalsComponent } from './proposal/proposals.component';
import { ProposalEditComponent } from './proposal/components/proposal-edit/proposal-edit.component';
import { ProposalsPageComponent } from './proposal/proposals-page.component';


const routes: Routes = [
    // { path: '', redirectTo: '/proposals-page/proposals', pathMatch: 'full' },
    // { path: '', redirectTo: '/login', pathMatch: 'full' },
     { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    //{ path: 'proposlas-page', component: ProposalsPageComponent }

    // { path: 'proposals',  component: ProposalsComponent },
    // { path: 'proposals/:id/edit',  component: ProposalEditComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true }) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}