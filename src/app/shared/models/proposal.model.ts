import { User } from './user.model';

export class Proposal {
    id: number;
    userAccount: User;
    idManager: number;
    manager: string;
    moneyProposal: string;
    companyProfile: string;
    nationalWorkProfile: string;
    motivation: string;
    status: string; // locked
    dateRequest: Date;
}