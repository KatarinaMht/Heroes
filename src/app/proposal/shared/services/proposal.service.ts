import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Proposal } from '../models/proposal.model';
import { ProposalCriteria } from '../models/proposal-criteria.model';
import { PROPOSALS } from '../proposals-mock';

@Injectable()
export class ProposalService {

    getProposals(criteria: ProposalCriteria): Promise<Array<Proposal>> {
        return Promise.resolve(PROPOSALS);
    }

    updateProposal(proposal: Proposal): Promise<Proposal> {
        return null;
    }

    insertProposal(proposal: Proposal): Promise<Proposal> {
        return null;
    }

    deleteProposal(proposal: Proposal): Promise<Proposal> {
        return null;
    }

}