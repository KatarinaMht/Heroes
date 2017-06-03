import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { ProposalService } from './services/proposal.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { FilterService } from './services/filter/filter.service';
import { HttpClientService } from './services/http-client/http-client.service';
import { ProposalConverter } from './services/converter/proposal.converter';
import { UserConverter } from './services/converter/user.converter';

@NgModule({
    imports: [ FormsModule, 
               CommonModule,
               ReactiveFormsModule
            ],
    exports: [ FormsModule,
               AlertComponent,
               LoginComponent 
            ],
    declarations: [ 
                AlertComponent, 
                LoginComponent 
            ],
    providers: [ 
                AuthService, 
                ProposalService,
                UserService,
                FilterService,
                HttpClientService,
                ProposalConverter,
                UserConverter
            ]
})

export class SharedModule { }