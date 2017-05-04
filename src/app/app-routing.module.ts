import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProposalsComponent } from './proposal/components/proposals.component';

const routes: Routes = [
    { path: '', redirectTo: '/proposals', pathMatch: 'full' },
    { path: 'proposals',  component: ProposalsComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}