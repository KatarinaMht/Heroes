import { Injectable } from '@angular/core';
import * as _ from "lodash";

import { Proposal } from '../../../shared/models/proposal.model';
import { User } from '../../../shared/models/user.model';

@Injectable()
export class ProposalConverter {

    convertProposalToModel(prop: any): Proposal {
        console.log('converter of proposal',prop);
        let proposal = new Proposal();
        proposal.id = prop.id;
        proposal.userAccount = _.cloneDeep(prop.userAccount);
        proposal.manager = _.cloneDeep(prop.manager);
        proposal.moneyProposal = prop.moneyProposal;
        proposal.companyProfile = prop.companyProfile;
        proposal.nationalWorkProfile = prop.nationalWorkProfile;
        proposal.motivation = prop.motivation;
        proposal.status = prop.status;
        proposal.dateRequest = prop.dateRequest;
console.log('after',proposal);
        return proposal;
    }

    convertModelToProposal(prop: Proposal): any {

        let proposal: any = {};
        proposal.id = prop.id;
        proposal.userAccount = new User();
        proposal.userAccount = _.cloneDeep(prop.userAccount);
        proposal.manager = new User();
        proposal.manager = _.cloneDeep(prop.manager);
        proposal.moneyProposal = prop.moneyProposal;
        proposal.companyProfile = prop.companyProfile;
        proposal.nationalWorkProfile = prop.nationalWorkProfile;
        proposal.motivation = prop.motivation;
        proposal.status = prop.status;
        proposal.dateRequest = prop.dateRequest;

        return proposal;
    }
}