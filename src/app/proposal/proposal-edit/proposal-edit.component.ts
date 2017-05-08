import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as _ from "lodash";

import { Proposal } from '../../shared/models/proposal.model';
import { ProposalService } from '../../shared/services/proposal.service';

@Component({
  selector: 'esl-proposal-edit',
  templateUrl: './proposal-edit.component.html',
  styleUrls: ['./proposal-edit.component.css'],
  providers: [ ProposalService ]
})

export class ProposalEditComponent implements OnInit {

    editProposal: Proposal;
    // proposalFormGroup = new FormGroup ({
    //     formControlMoneyProposal: new FormControl()
    // })
    proposalForm: FormGroup;

    constructor(private proposalService: ProposalService, private router: Router, private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.proposalForm = this.fb.group({
            moneyProposal: [ '', Validators.required ], // Validators.maxLength(5)
            motivation: [ '', Validators.required  ] // Validators.maxLength(200)
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

    onSubmit() {
        // deep copy
        const formModel = this.proposalForm.value;
        const editProposalCopy = _.cloneDeep(this.editProposal);
        console.log("onSumbit, editProposalCopy: " + JSON.stringify(editProposalCopy));
        editProposalCopy.moneyProposal = formModel.moneyProposal;
        editProposalCopy.motivation = formModel.motivation;

        this.proposalService.updateProposal(editProposalCopy).then( 
            (proposal:Proposal) => { console.log("sucess on edit: " + JSON.stringify(proposal))},
            (reason: any) => { console.log("error on edit")}
        );
        this.router.navigate(['/proposals']);
    }

    revert() {
        // this.proposalForm.setValue({
        //     moneyProposal: this.editProposal.moneyProposal,
        //     motivation: this.editProposal.motivation 
        // });
        this.router.navigate(['/proposals']);
    }
}