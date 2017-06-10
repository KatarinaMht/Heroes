"use strict";

module.exports = {
    developMode:true, 
    base: 'http://localhost:8080',
    api: {
        hosts: {
            base: 'http://localhost:8080',
            otherexample: 'https://www.google.com/api'
        },
        endpoint: {
            proposals: '/evaluation',
            login: '/login',
            teamLeaderUsers:'/team-mapping',
            employees:'/employees'

        }
    }
};
