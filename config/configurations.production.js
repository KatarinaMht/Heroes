"use strict";

module.exports = {
    developMode:true, 
    base: 'http://localhost:8080',
    api: {
        hosts: {
            base: 'https://production.eng.it/esl-evaluator-be',
        },
        endpoint: {
            proposals: '/evaluation',
            login: '/login',
            teamLeaderUsers:'/team-mapping',
            employees:'/employees'

        }
    }
};
