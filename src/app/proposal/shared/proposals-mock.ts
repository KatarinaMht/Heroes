import { Proposal } from "./proposal.model";

export const PROPOSALS: Proposal[] = [
    {
        id: 0,
        userAccount: {firstName: 'Paja', lastName: 'Patak'},
        manager: {firstName: 'Fabio', lastName: 'Staro'},
        moneyProposal: 10000,
        companyProfile: 'kkkkk',
        nationalWorkProfile: 'hhhhh',
        motivation: 'eeeee',
        status: 'Active',
        dateRequest: null
    },
    {
        id: 0,
        userAccount: {firstName: 'Miki', lastName: 'Maus'},
        manager: {firstName: 'Alessandro', lastName: 'Avolio'},
        moneyProposal: 20000,
        companyProfile: 'hhhhh',
        nationalWorkProfile: 'sssss',
        motivation: 'llllll',
        status: 'Active',
        dateRequest: null
    },
    {
        id: 0,
        userAccount: {firstName: 'Sofronije', lastName: 'Petao'},
        manager: {firstName: 'Alessandro', lastName: 'Avolio'},
        moneyProposal: 30000,
        companyProfile: 'dzdfzsdfzs',
        nationalWorkProfile: 'nbbmnbmn',
        motivation: 'ytyutyuyut',
        status: 'Locked',
        dateRequest: null
    }
];