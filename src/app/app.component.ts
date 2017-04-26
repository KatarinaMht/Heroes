    import { Component } from '@angular/core';

    @Component({
      selector: 'my-app',
      styleUrls: ['./app.component.css'],
      template: `
        <h1>{{title}}</h1>
      `
    })

    export class AppComponent {
      title = 'Proposal ESL';
    }