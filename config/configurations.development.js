"use strict";

module.exports = {
    developMode:true, 
    base: 'http://localhost:8080',
    api: {
        hosts: {
            evaluator: 'https://localhost:8443'
        },
        endpoint: {
            evaluator: '/json/evaluator',
            eslPlanner: '/json/eslPlanner'
        }
    }
};
