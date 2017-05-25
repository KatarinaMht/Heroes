import { User } from '../models/user.model';

export const USERS: User[] = [
    { 
        id: 1,
        firstName: 'Fabio',
        lastName: 'Staro',
        username: 'fabstaro',
        password: 'f',
        email: 'fabstaro@mht.net',
        role: 'Manager',
        assigned: false
    },
    { 
        id: 2,
        firstName: 'Alessandro',
        lastName: 'Avolio',
        username: 'alessandro',
        password: 'a',
        email: 'avolio@mht.net',
        role: 'TeamLeader',
        assigned: false
    },
    { 
        id: 3,
        firstName: 'Katarina',
        lastName: 'Kraus',
        username: 'katarina',
        password: 'k',
        email: 'kk@mht.net',
        role: 'Employee',
        assigned: false
    },
    { 
        id: 4,
        firstName: 'Paja',
        lastName: 'Patak',
        username: '',
        password: '',
        email: 'PajaPatak@mht.net',
        role: 'Employee',
        assigned: false
    },
    { 
        id: 5,
        firstName: 'Miki',
        lastName: 'Maus',
        username: '',
        password: '',
        email: 'Miki@mht.net',
        role: 'Employee',
        assigned: false
    },
    { 
        id: 6,
        firstName: 'Sofronije',
        lastName: 'Petao',
        username: '',
        password: '',
        email: 'Sofronije@mht.net',
        role: 'Employee',
        assigned: false
    },
    { 
        id: 7,
        firstName: 'Oliver',
        lastName: 'Bradonjic',
        username: 'oliver',
        password: 'o',
        email: 'oliver@mht.net',
        role: 'TeamLeader',
        assigned: false
    },
];