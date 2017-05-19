import { ProposalService } from './services/proposal.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './components/login/login.component';
import { AlertComponent } from './components/alert/alert.component';
import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';



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
                ProposalService 
            ]
})

export class SharedModule { }