    import { Component } from '@angular/core';
    import { AuthService } from './shared/services/auth.service';

    @Component({
     moduleId: module.id,
      selector: 'my-app',
      templateUrl: 'app.component.html',
      styleUrls: ['app.component.css']
    })

    export class AppComponent {

        constructor(private authService: AuthService) {

        }
      
    }