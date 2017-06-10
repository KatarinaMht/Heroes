import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';

import { User } from '../shared/models/user.model';

@Component({
  moduleId: module.id,
  templateUrl: 'proposals-page.component.html'
})

export class ProposalsPageComponent implements OnInit { 

  user: User;
  constructor(private auth:AuthService){

  }

  ngOnInit(): void {
    this.user = this.auth.getUser();
    
  }

}