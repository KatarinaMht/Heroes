import { User } from './user.model';

export class Proposal {
    id: number;
    userAccount: User;
    manager: User;
    moneyProposal: string;
    companyProfile: string;
    nationalWorkProfile: string;
    motivation: string;
    status: string; // locked
    dateRequest: Date;
}