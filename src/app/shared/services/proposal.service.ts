import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Proposal } from '../../shared/models/proposal.model';
import { ProposalCriteria } from '../../shared/models/proposal-criteria.model';
import { PROPOSALS } from '../../proposal/shared/proposals-mock';

@Injectable()
export class ProposalService {

    getProposals(criteria: ProposalCriteria): Promise<Array<Proposal>> {
        return Promise.resolve(PROPOSALS);
    }

    updateProposal(proposal: Proposal): Promise<Proposal> {
        console.log("updateProposal: " + JSON.stringify(proposal));
        return Promise.resolve(proposal);
    }

    insertProposal(proposal: Proposal): Promise<Proposal> {
        return null;
    }

    deleteProposal(proposal: Proposal): Promise<Proposal> {
        return null;
    }

}