export class Proposal {
    id: number;
    userAccount: {
        firstName: string, 
        lastName: string
    };
    manager: {
        firstName: string, 
        lastName: string
    };
    moneyProposal: number;
    companyProfile: string;
    nationalWorkProfile: string;
    motivation: string;
    status: string;
    dateRequest: Date;
}