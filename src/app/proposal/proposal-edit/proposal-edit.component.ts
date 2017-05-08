import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Proposal } from '../../shared/models/proposal.model';

@Component({
  selector: 'esl-proposal-edit',
  templateUrl: './proposal-edit.component.html',
  styleUrls: ['./proposal-edit.component.css']
})

export class ProposalEditComponent implements OnInit {

    editProposal: Proposal;
    // proposalFormGroup = new FormGroup ({
    //     formControlMoneyProposal: new FormControl()
    // })
    proposalForm: FormGroup;

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.proposalForm = this.fb.group({
            moneyProposal: [ '', Validators.required ],
            motivation: [ '', Validators.required ]
        });
    }

    ngOnInit(): void {
      // Mock  
      this.editProposal = {
                                id: 0,
                                userAccount: {firstName: 'Paja', lastName: 'Patak'},
                                manager: {firstName: 'Fabio', lastName: 'Staro'},
                                moneyProposal: 10000,
                                companyProfile: 'kkkkk',
                                nationalWorkProfile: 'hhhhh',
                                motivation: 'eeeee',
                                status: 'Active',
                                dateRequest: null
                            };

        this.proposalForm.setValue({
            moneyProposal: this.editProposal.moneyProposal,
            motivation: this.editProposal.motivation
        });
    }
}