import { Proposal } from './../../../shared/models/proposal.model';
import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as _ from "lodash";
import * as $ from 'jquery';

import { Proposal } from '../../../shared/models/proposal.model';
import { ProposalCriteria } from '../../../shared/models/proposal-criteria.model';
import { User } from '../../../shared/models/user.model';

import { ProposalService } from '../../../shared/services/proposal.service';
import { SortService } from '../../../shared/services/sort/sort.service';
import { FilterService } from '../../../shared/services/filter/filter.service';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    moduleId: module.id,
    selector: 'esl-proposal-list',
    templateUrl: 'proposal-list.component.html',
    styleUrls: ['proposal-list.component.css'],
    providers: [ProposalService, SortService, FilterService, AuthService]
})

export class ProposalListComponent implements OnInit {

    @Output() onEdit: EventEmitter<Proposal> = new EventEmitter<Proposal>();
    @Output() onDelete: EventEmitter<Proposal> = new EventEmitter<Proposal>();
    // @Output() onLock: EventEmitter<Proposal> = new EventEmitter<Proposal>();   or like this????

    user: User;
    loading:boolean;

    proposals: Proposal[];
    proposalCriteria: ProposalCriteria;

    proposalSortedFiltered: Proposal[];
    sortByProperties: string[];
    sortByOrders: string[];
    sortingIcons: any;

    proposalFilter: Proposal;
    filterFirstName: string;
    filterLastName: string;
    filterManagerName: string;
    filterCompanyProfile: string;
    filterNationalWorkProfile: string;

    constructor(private proposalService: ProposalService, private sortService: SortService, private filterService: FilterService,
        private authService: AuthService, private userService: UserService) { }

    ngOnInit(): void {

        // console.log("ngOnInit proposal-list");

        //this.user = this.authService.getUser();
        //console.log("this.user.role = " + this.user.role);

        this.user = new User();
      this.user= this.authService.getUser();
        

        // change proposalCriteria !!!!!!!!!!!!!
        this.proposalCriteria = {
            id_manager: this.user.id,
            //id_manager: parseInt(window.localStorage.getItem('userId')),
            year: null
        };
        this.getProposals(this.proposalCriteria);

        this.sortByProperties = [];
        this.sortByOrders = [];
        this.sortingIcons = {
            fisrtName: { asc: false, sort: false },
            lastName: { asc: false, sort: false },
            manager: { asc: false, sort: false },
            companyProfile: { asc: false, sort: false },
            nationalWorkProfile: { asc: false, sort: false }
        };

        this.proposalFilter = new Proposal();
        this.proposalFilter.userAccount = new User();
    }

    /**
     * Get list of proposlas.
     * 
     * @param criteria ProposalCriteria
     */
    getProposals(criteria: ProposalCriteria) {
        this.loading=true;
        console.log('loading', this.loading);
        let usercriteria = { teamLeaderId: this.user.id };
        this.userService.getEmployees(usercriteria).then((users) => {
            this.proposalService.getProposals(criteria).then(
                proposals => {
                    let finalProposal = [];
                    users.forEach((u) => {
                        let trovato = false;
                        // console.log('ps', proposals);
                        
                        proposals.forEach((p) => {
                           
                            // console.log('check', p.userAccount.id, u.id);
                            if (p.userAccount.id === u.id) {
                                // console.log('trovato', p);
                                trovato = true;
                                finalProposal.push(p);
                            }


                        });
                        if (!trovato) {
                            // console.log('non trovato', u.id);
                            let np = new Proposal();
                            np.userAccount = u;
                            finalProposal.push(np);
                        }
                        
                    });

                    this.proposals = finalProposal;
                    this.proposalSortedFiltered = finalProposal;
                    this.loading=false;
                    console.log('loading xx', this.loading);
                }
            ).catch(()=>{
                this.loading=false;
            });



            // console.log("proposlas: " + JSON.stringify(this.proposals));
        })

    }

    /**
     * Emits proposal for the edit modal.
     */
    openEditModal(proposal: Proposal) {
        this.onEdit.emit(proposal);
    }

    /**
     * Delets selected propsal.
     */
    deleteProposal(proposal: Proposal) {
        // console.log("1 prop list deleteProposal = " + JSON.stringify(proposal));
        this.onDelete.emit(proposal);
        this.reload();
    }

    allLockStatus=false;
    lockAll(){
        this.proposals.forEach((p)=>{
            this.lock(p,true,'Active');//this.allLockStatus?'Active':'Locked'
        });
        this.allLockStatus=!this.allLockStatus;
        this.reload();
    }

    /**
     * Locks selected proposal.
     */
    lock(proposal: Proposal,all?:boolean,value?:string) {

        // console.log("lock proposal: " + JSON.stringify(proposal));
        if (!proposal.id) {
            
            this.proposalService.insertProposal(proposal).then((proposalreturned: Proposal) => {
                this.realLock(proposalreturned,all,value);

            })
        } else {
            this.realLock(proposal,all,value);

        }

    }
    private realLock(proposal: Proposal,all?:boolean,value?:string) {
        let lockProposal = _.cloneDeep(proposal);
        if(lockProposal.status==='Locked' &&!all){
            lockProposal.status=value||'Active';
        }else{
  lockProposal.status = 'Locked';
        }
      

        this.proposalService.updateProposal(lockProposal).then(
            proposal => {
                // console.log("proposal locked: " + JSON.stringify(proposal));
                if(!all){
                this.reload();
                }
            },
            reason => { }
        );
    }
    /**
     * Reloads proposal list.
     */
    public reload() {
        // console.log("reload - proposal-list.component.ts");
        this.getProposals(this.proposalCriteria);
    }

    /**
     * Set sorting state arrays sortByProperties and sortByOrders by given parameters. 
     * 
     * @param columnName string; Variabile to add sort para,eter to sortByProperties array.
     * @param columnNameIcon string; Variable to manage the state of fa-sort icon.
     */
    sortByColumn(columnName: string, columnNameIcon: string) {

        // this.proposalsSorted = this.sortService.sortArray(this.proposals, columnName, columnNameIcon,
        //                                                      this.sortByProperties, this.sortByOrders, this.sortingIcons);

        let index = this.sortByProperties.indexOf(columnName);
        let isInSortArray = index !== -1;

        if (isInSortArray) {
            if (this.sortByOrders[index] == 'asc') {

                this.sortByOrders[index] = 'desc';

                this.sortingIcons[columnNameIcon].asc = false;
                this.sortingIcons[columnNameIcon].sort = true;
            }
            else {
                _.pullAt(this.sortByProperties, [index]);
                _.pullAt(this.sortByOrders, [index]);

                this.sortingIcons[columnNameIcon].asc = false;
                this.sortingIcons[columnNameIcon].sort = false;
            }
        } else {
            // For one column sort:
            this.sortByProperties = [];
            this.sortByOrders = [];
            this.resetSortingIcons();
            //

            this.sortByProperties.push(columnName);
            this.sortByOrders.push('asc');

            this.sortingIcons[columnNameIcon].asc = true;
            this.sortingIcons[columnNameIcon].sort = true;
        }
    }

    /**
     * Reset state of fa-sort icons in sortingIcons object to default values.
     */
    resetSortingIcons() {
        this.sortingIcons = {
            fisrtName: { asc: false, sort: false },
            lastName: { asc: false, sort: false },
            manager: { asc: false, sort: false },
            companyProfile: { asc: false, sort: false },
            nationalWorkProfile: { asc: false, sort: false },
            moneyProposal: { asc: false, sort: false }
        };
    }

    /**
     * Sort and filter proposal array.
     */
    proposalSortAndFilter() {
        this.proposalSortedFiltered = this.proposals;

        // Create filter object.
        this.proposalFilter = new Proposal();
        this.proposalFilter.userAccount = new User();
        this.proposalFilter.userAccount.firstName = this.filterFirstName;
        this.proposalFilter.userAccount.lastName = this.filterLastName;
        // this.proposalFilter.manager = this.filterManagerName;
        this.proposalFilter.companyProfile = this.filterCompanyProfile;
        this.proposalFilter.nationalWorkProfile = this.filterNationalWorkProfile;
        // console.log('proposalFilter: ' + JSON.stringify(this.proposalFilter));

        // FILTER
        this.proposalSortedFiltered = this.filterService.filterBy(this.proposals, this.proposalFilter);
        // SORT
        this.proposalSortedFiltered = _.orderBy(this.proposalSortedFiltered, this.sortByProperties, this.sortByOrders);
    }

}