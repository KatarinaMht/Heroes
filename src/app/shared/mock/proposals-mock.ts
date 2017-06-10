import { Proposal } from "../../shared/models/proposal.model";

export const PROPOSALS: Proposal[] = [
    {
        id: 0,
        userAccount: { 
                        id: 4,
                        firstName: 'Paja',
                        lastName: 'Patak',
                        username: '',
                        password: '',
                        email: '',
                        role: 'Employee'
                    },
        idManager: 1,
        manager: 'Staro Fabio',
        moneyProposal: 'Variabile',
        companyProfile: 'Nulla',
        nationalWorkProfile: 'Aumento di livello',
        motivation: 'eeeee',
        status: 'Active',
        dateRequest: null
    },
    {
        id: 1,
        userAccount: { 
                        id: 5,
                        firstName: 'Miki',
                        lastName: 'Maus',
                        username: '',
                        password: '',
                        email: '',
                        role: 'Employee'
                    },
        idManager: 2,
        manager: 'Avolio Alessandro',
        moneyProposal: 'Premio Una tantum',
        companyProfile: 'Aumento di livello',
        nationalWorkProfile: 'N.A.',
        motivation: 'llllll',
        status: 'Active',
        dateRequest: null
    },
    {
        id: 2 ,
        userAccount: { 
                        id: 6,
                        firstName: 'Sofronije',
                        lastName: 'Petao',
                        username: '',
                        password: '',
                        email: '',
                        role: 'Employee'
                    },
        idManager: 2,
        manager: 'Avolio Alessandro',
        moneyProposal: 'Aumento di stipendio',
        companyProfile: 'Nulla',
        nationalWorkProfile: 'Aumento di livello',
        motivation: 'ytyutyuyut',
        status: 'Locked',
        dateRequest: null
    }
];

export const PROPOSALS_BY_MANAGER: any[] = [
    {
        id_manager: 1,  // Fabio
        proposals: [
            {
                id: 0,
                userAccount: { 
                                id: 4,
                                firstName: 'Paja',
                                lastName: 'Patak',
                                username: '',
                                password: '',
                                email: '',
                                role: 'Employee'
                            },
                manager: 'Staro Fabio',
                moneyProposal: 'Variabile',
                companyProfile: 'Nulla',
                nationalWorkProfile: 'Aumento di livello',
                motivation: 'eeeee',
                status: 'Active',
                dateRequest: null
            },
            {
                id: 1,
                userAccount: { 
                                id: 5,
                                firstName: 'Miki',
                                lastName: 'Maus',
                                username: '',
                                password: '',
                                email: '',
                                role: 'Employee'
                            },
                manager: 'Avolio Alessandro',
                moneyProposal: 'Premio Una tantum',
                companyProfile: 'Aumento di livello',
                nationalWorkProfile: 'N.A.',
                motivation: 'llllll',
                status: 'Active',
                dateRequest: null
            },
            {
                id: 2 ,
                userAccount: { 
                                id: 6,
                                firstName: 'Sofronije',
                                lastName: 'Petao',
                                username: '',
                                password: '',
                                email: '',
                                role: 'Employee'
                            },
                manager: 'Avolio Alessandro',
                moneyProposal: 'Aumento di stipendio',
                companyProfile: 'Nulla',
                nationalWorkProfile: 'Aumento di livello',
                motivation: 'ytyutyuyut',
                status: 'Locked',
                dateRequest: null
            }            
        ]
    },
    {
        id_manager: 2,  // Alessandro
        proposals: [
            {
                id: 1,
                userAccount: { 
                                id: 5,
                                firstName: 'Miki',
                                lastName: 'Maus',
                                username: '',
                                password: '',
                                email: '',
                                role: 'Employee'
                            },
                manager: 'Avolio Alessandro',
                moneyProposal: 'Premio Una tantum',
                companyProfile: 'Aumento di livello',
                nationalWorkProfile: 'N.A.',
                motivation: 'llllll',
                status: 'Active',
                dateRequest: null
            },
            {
                id: 2 ,
                userAccount: { 
                                id: 6,
                                firstName: 'Sofronije',
                                lastName: 'Petao',
                                username: '',
                                password: '',
                                email: '',
                                role: 'Employee'
                            },
                manager: 'Avolio Alessandro',
                moneyProposal: 'Aumento di stipendio',
                companyProfile: 'Nulla',
                nationalWorkProfile: 'Aumento di livello',
                motivation: 'ytyutyuyut',
                status: 'Locked',
                dateRequest: null
            }
        ]
    }

];

export const MONEY_PROPOSAL: string[] = [
    'Nulla',
    'Premio Una tantum',
    'Aumento di stipendio',
    'Variabile'
];

export const COMPANY_PROFILE: string[] = [
    'Nulla',
    'Aumento di livello'
];

export const NATIONAL_WORK_PROFILE: string[] = [
    'Nulla',
    'Aumento di livello'
];

