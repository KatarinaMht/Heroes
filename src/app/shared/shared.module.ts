import { NgModule }     from '@angular/core';
import { FormsModule }  from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

import { AlertComponent } from './alert/alert.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    imports: [ FormsModule, CommonModule ],
    exports: [ FormsModule,
               AlertComponent,
               LoginComponent 
            ],
    declarations: [ 
                AlertComponent, 
                LoginComponent 
            ],
    providers: []
})

export class SharedModule { }