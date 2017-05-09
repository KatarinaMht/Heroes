import { Proposal } from "../../shared/models/proposal.model";

export const PROPOSALS: Proposal[] = [
    {
        id: 0,
        userAccount: {firstName: 'Paja', lastName: 'Patak'},
        manager: {firstName: 'Fabio', lastName: 'Staro'},
        moneyProposal: 'Variabile',
        companyProfile: 'Nulla',
        nationalWorkProfile: 'Aumento di livello',
        motivation: 'eeeee',
        status: 'Active',
        dateRequest: null
    },
    {
        id: 1,
        userAccount: {firstName: 'Miki', lastName: 'Maus'},
        manager: {firstName: 'Alessandro', lastName: 'Avolio'},
        moneyProposal: 'Premio Una tantum',
        companyProfile: 'Aumento di livello',
        nationalWorkProfile: 'N.A.',
        motivation: 'llllll',
        status: 'Active',
        dateRequest: null
    },
    {
        id: 2 ,
        userAccount: {firstName: 'Sofronije', lastName: 'Petao'},
        manager: {firstName: 'Alessandro', lastName: 'Avolio'},
        moneyProposal: 'Aumento di stipendio',
        companyProfile: 'Nulla',
        nationalWorkProfile: 'Aumento di livello',
        motivation: 'ytyutyuyut',
        status: 'Locked',
        dateRequest: null
    }
];

export const MONEY_PROPOSAL: string[] = [
    '',
    'N.A.',
    'Nulla',
    'Premio Una tantum',
    'Aumento di stipendio',
    'Variabile'
];

export const COMPANY_PROFILE: string[] = [
    '',
    'N.A.',
    'Nulla',
    'Aumento di livello'
];

export const NATIONAL_WORK_PROFILE: string[] = [
    '',
    'N.A.',
    'Nulla',
    'Aumento di livello'
];

