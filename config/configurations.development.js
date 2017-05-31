"use strict";

module.exports = {
    developMode:true, 
    base: 'http://localhost:8080',
    api: {
        hosts: {
            base: 'https://localhost:8443/json/evaluator',
            otherexample: 'https://www.google.com/api'
        },
        endpoint: {
            proposals: '/proposals',
            teamLeaderUsers:'/team-mapping'
          
        }
    }
};
