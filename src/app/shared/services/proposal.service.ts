import { Http } from '@angular/http';
import { ConfigurationsService } from './configuration/configuration.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from "lodash";

import { Proposal } from '../../shared/models/proposal.model';
import { ProposalCriteria } from './../models/proposal-criteria.model';
import { PROPOSALS } from '../mock/proposals-mock';

@Injectable()
export class ProposalService {

    proposalList: Proposal[];
    private endpointForProposal:string;
    constructor(private confService:ConfigurationsService, private http:Http){

        this.endpointForProposal = this.confService.getApiEndpoint('proposals');

        //check for local fake but permanent data
          let tmpProposal=JSON.parse(window.localStorage.getItem('proposal'));
          if(tmpProposal){
               this.proposalList=tmpProposal;
          }else{
              this.proposalList = PROPOSALS;
          }
       
    }

    getProposals(criteria: ProposalCriteria): Promise<Array<Proposal>> {
        this.http.get(this.endpointForProposal).then(
            ....
        )

        //this.proposalList = []; //no total reset
        let proposalToReturn;
        if (criteria.id_manager == 1) {             // manager fabio with role manager
            proposalToReturn = this.proposalList;
        } else {
            proposalToReturn=[];
            for (let porop of this.proposalList) {  // else team leader
                if (criteria.id_manager == porop.idManager) {
                    proposalToReturn.push(porop);
                    //return Promise.resolve(poroposalList.proposals);
                }
            }
        }

        return Promise.resolve(proposalToReturn);
    }

    getProposalById(id: number): Promise<Proposal> {

        let proposal = null;
        for (let prop of this.proposalList) {
            console.log(JSON.stringify(prop)); 
            if (prop.id == id) {
                    proposal = _.cloneDeep(prop);
            }
        }

        return Promise.resolve(proposal);
    }

    updateProposal(proposal: Proposal): Promise<Proposal> {

        let index = -1;
        for (let prop of this.proposalList) { 
            if (prop.id === proposal.id) {
 
                    index = this.proposalList.indexOf(prop);
                }
        }
        this.proposalList.splice(index, 1, proposal);
        //update localstorage 
        window.localStorage.setItem('proposal',JSON.stringify( this.proposalList));
        return Promise.resolve(proposal);
    }

    insertProposal(proposal: Proposal): Promise<Proposal> {
        return null;
    }

    deleteProposal(proposal: Proposal): Promise<Proposal> {

        for (let prop of this.proposalList) { 
            console.log('check',prop,prop.id === proposal.id);
            if (prop.id === proposal.id) {
                    prop.companyProfile = 'N.A.';
                    prop.nationalWorkProfile = 'N.A.';
                    prop.moneyProposal = 'N.A.';
                    prop.motivation = '';
                }
        }
        console.log('new List',this.proposalList);
 //update localstorage 
        window.localStorage.setItem('proposal',JSON.stringify( this.proposalList));
        return Promise.resolve(proposal);
    }

}