import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from "lodash";

import { ConfigurationsService } from './configuration/configuration.service';
import { ProposalConverter } from '../services/converter/proposal.converter';

import { Proposal } from '../../shared/models/proposal.model';
import { ProposalCriteria } from './../models/proposal-criteria.model';
import { PROPOSALS } from '../mock/proposals-mock';

@Injectable()
export class ProposalService {

    private endpointForProposal: string;

    constructor(private confService: ConfigurationsService, private http: Http, private proposalConverter: ProposalConverter){

        this.endpointForProposal = this.confService.getApiEndpoint('proposals');       
    }

    getProposals(criteria: ProposalCriteria): Promise<Proposal[]> {
        let url=this.endpointForProposal;
        let params: URLSearchParams = new URLSearchParams();
        
        if(criteria.id_manager){
            params.set('teamLeaderId',''+criteria.id_manager);
            // url+='/findByUserAccountManagerId';
        }
        // console.log('parte la chiamata');
        return this.http.get(url, {search: params})
                    .toPromise()
                    .then(response => {
                        let body = response.json();
                        // console.log('getProposals',body);
                        let proposals = body || [];
                        let proposalsModel: Proposal[] = [];
                        proposals.forEach((prop: any) => {
                            if(!prop)return;
                            proposalsModel.push(this.proposalConverter.convertProposalToModel(prop));
                        });
                        return proposalsModel;
                    })
                    .catch(this.handleError);  
    }

    getProposalById(id: number) {
        let url=this.endpointForProposal+'/'+id;
        let params: URLSearchParams = new URLSearchParams();
        //params.set('id_proposal', JSON.stringify(id));

        return this.http.get(url, {search: params})
                    .toPromise()
                    .then(response => {
                        let body = response.json();
                        // console.log('getProposals',body);
                        let proposals = body || [];
                        let proposalsModel: Proposal[] = [];
                        proposals.forEach((prop: any) => {
                            if(!prop)return;
                            proposalsModel.push(this.proposalConverter.convertProposalToModel(prop));
                        });
                        return proposalsModel[0];
                    })
                    .catch(this.handleError); 
    }

    updateProposal(proposal: Proposal): Promise<Proposal> {
         let url=this.endpointForProposal+'/'+proposal.id;
        return this.http.put(url,proposal)
                    .toPromise()
                    .then(this.extractProposal)
                    .catch(this.handleError);
    }

    insertProposal(proposal: Proposal): Promise<Proposal> {
        let url=this.endpointForProposal;
        return this.http.post(url,proposal)
                    .toPromise()
                    .then(this.extractProposal)
                    .catch(this.handleError);
    }

    deleteProposal(proposal: Proposal): Promise<Proposal> {
        let url=this.endpointForProposal+'/'+proposal.id;
    
        return this.http.delete(url)
                    .toPromise()
                    .then(this.extractProposal)
                    .catch(this.handleError);
    }

    private extractProposal=(response: Response)=> {
        let body = response.json();
        let proposal = body || {};
        let proposalModel: Proposal;
        proposalModel = this.proposalConverter.convertProposalToModel(proposal);

        return proposalModel;
    }

    private handleError (error: Response | any) {
        console.log("Prop. serv. error: " + error);
    }
}