import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'esl-proposals',
  templateUrl: './proposals.component.html',
  styleUrls: ['./proposals.component.css']
})

export class ProposalsComponent implements OnInit {

    editMessage: string;

    ngOnInit(): void {}

    constructor() {}

    onEditClick(message: string) {
      this.editMessage = message;
    }
}