import { Component, OnInit } from '@angular/core';

import { User } from '../shared/models/user.model';

@Component({
  moduleId: module.id,
  templateUrl: 'proposals-page.component.html'
})

export class ProposalsPageComponent implements OnInit { 

  user: User;

  ngOnInit(): void {
    this.user = new User;
    this.user.role = window.localStorage.getItem('userRole');
  }

}