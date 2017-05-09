import { UserAccount } from './user-acount.model';

export class Proposal {
    id: number;
    userAccount: UserAccount;
    manager: UserAccount;
    moneyProposal: string;
    companyProfile: string;
    nationalWorkProfile: string;
    motivation: string;
    status: string;
    dateRequest: Date;
}