import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from "lodash";

import { Proposal } from '../../../shared/models/proposal.model';
import { ProposalService } from '../../../shared/services/proposal.service';
import { MONEY_PROPOSAL, COMPANY_PROFILE, NATIONAL_WORK_PROFILE } from '../../../shared/mock/proposals-mock';
import { editValidator } from '../../../shared/validators/edit-module.validator';

@Component({
    moduleId: module.id,
    selector: 'esl-proposal-edit',
    templateUrl: 'proposal-edit.component.html',
    styleUrls: ['proposal-edit.component.css'],
    providers: [ProposalService]
})

export class ProposalEditComponent implements OnInit {

    editProposal: Proposal;
    private _proposalId: number;

    @Input()
    set proposalId(id: number) {
        if (id === undefined) return;
        this._proposalId = id;
        console.log('new id', id);
        this.getProposalById(this._proposalId);
    }

    //EHI we forget to comunicate to parent that you have submitted something
    @Output('onSubmit') onSubmitOutput: EventEmitter<Proposal> = new EventEmitter<Proposal>();


    // proposalFormGroup = new FormGroup ({
    //     formControlMoneyProposal: new FormControl()
    // })
    proposalForm: FormGroup;

    moneyProposalList: string[];
    companyProfileList: string[];
    nationalWorkProfileList: string[];

    constructor(private proposalService: ProposalService, private router: Router, public route: ActivatedRoute, private fb: FormBuilder) {
        this.createForm();
        console.log(" form constructor");
    }

    ngOnInit(): void {

        this.moneyProposalList = MONEY_PROPOSAL;
        this.companyProfileList = COMPANY_PROFILE;
        this.nationalWorkProfileList = NATIONAL_WORK_PROFILE;

        if (this.proposalId == undefined) { this.getProposalIdFromRoute(); }

        console.log("this.proposalId = " + this.proposalId);
    }

    /**
     * Gets proposal object by id
     * 
     * @param proposalId number
     */
    getProposalById(id: number) {

        this.proposalService.getProposalById(id).then(
            proposal => {

                this.editProposal = proposal;
                console.log('proposal to edit', this.editProposal);
                console.log('actual form before adding value from service',  this.proposalForm,  this.proposalForm.controls['proposalCombo']);
                this.proposalForm.controls['proposalCombo'].controls['companyProfile'].setValue(this.editProposal.companyProfile);
                this.proposalForm.controls['proposalCombo'].controls['nationalWorkProfile'].setValue(this.editProposal.nationalWorkProfile);
                this.proposalForm.controls['proposalCombo'].controls['moneyProposal'].setValue(this.editProposal.moneyProposal);
                this.proposalForm.controls['proposalCombo'].controls['motivation'].setValue(this.editProposal.motivation);
                
            },

            reason => { console.log("error: this.proposalService.getProposalById"); }
        );
    }

    getProposalIdFromRoute() {

        this.route
            .params
            .subscribe(params => {
                console.log('hi');
                this.proposalId = params['id'];
            });
    }

    createForm() {
        console.log('createform');
        this.proposalForm = this.fb.group({
            // notUsedGroup: this.fb.group({

            //     address: ['']
            // }),
            proposalCombo: this.fb.group({
                companyProfile: [ 'Nulla' ],
                nationalWorkProfile: [ 'Nulla' ],
                moneyProposal: [ 'Nulla' ],
                motivation: ['']
            },
                {
                    validator: editValidator
                })
        });
        console.log('form', this.proposalForm);
    } 



    onSubmit() {
        console.log('onSubmit');
        // deep copy
        const formModel = this.proposalForm.controls['proposalCombo'].value;
        const editProposalCopy = _.cloneDeep(this.editProposal); //if you do a deep copy in service you don't have to do here

        editProposalCopy.companyProfile = formModel.companyProfile;
        editProposalCopy.nationalWorkProfile = formModel.nationalWorkProfile;
        editProposalCopy.moneyProposal = formModel.moneyProposal;
        editProposalCopy.motivation = formModel.motivation;
        console.log("onSumbit, editProposalCopy: " + JSON.stringify(editProposalCopy));

        this.proposalService.updateProposal(editProposalCopy).then(
            (proposal: Proposal) => {
                console.log("sucess on edit: " + JSON.stringify(proposal));
                this.onSubmitOutput.emit(proposal);
            },
            (reason: any) => { console.log("error on edit"); this.onSubmitOutput.emit(undefined); }
        );


    }

    revert() {
        console.log('revert');
        this.proposalForm.controls['proposalCombo'].setValue({
            companyProfile: this.editProposal.companyProfile,
            nationalWorkProfile: this.editProposal.nationalWorkProfile,
            moneyProposal: this.editProposal.moneyProposal,
            motivation: this.editProposal.motivation
        });

        $('#myModal').modal('hide');
    }
}