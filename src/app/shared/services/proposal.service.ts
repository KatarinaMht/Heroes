import { Http, Response, URLSearchParams, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as _ from "lodash";

import { ConfigurationsService } from './configuration/configuration.service';
import { Proposal } from '../../shared/models/proposal.model';
import { ProposalCriteria } from './../models/proposal-criteria.model';
import { PROPOSALS } from '../mock/proposals-mock';

@Injectable()
export class ProposalService {

    private endpointForProposal: string;

    constructor(private confService: ConfigurationsService, private http: Http){

        this.endpointForProposal = this.confService.getApiEndpoint('proposals');       
    }

    getProposals(criteria: ProposalCriteria): Promise<Proposal[]> {

        let params: URLSearchParams = new URLSearchParams();
        params.set('id_manager', JSON.stringify(criteria.id_manager));

        return this.http.get(this.endpointForProposal, {search: params})
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);  
    }

    getProposalById(id: number): Promise<Proposal> {

        let params: URLSearchParams = new URLSearchParams();
        params.set('id_proposal', JSON.stringify(id));

        return this.http.get(this.endpointForProposal, {search: params})
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError); 
    }

    updateProposal(proposal: Proposal): Promise<Proposal> {
        return this.http.put(this.endpointForProposal, JSON.stringify(proposal))
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
    }

    insertProposal(proposal: Proposal): Promise<Proposal> {
        return this.http.post(this.endpointForProposal, JSON.stringify(proposal))
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
    }

    deleteProposal(proposal: Proposal): Promise<Proposal> {

        let requestOptions = new RequestOptions();
        requestOptions.body = JSON.stringify(proposal);

        return this.http.delete(this.endpointForProposal, requestOptions)
                    .toPromise()
                    .then(this.extractData)
                    .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || { };
    }

    private handleError (error: Response | any) {
        console.log("Prop. serv. error: " + error);
    }
}