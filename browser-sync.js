'use strict';

module.exports = (function () {
    return {
        options: {
            "port": 8085,
            "https": false,
            "open": true,
            "server": {
                baseDir: ["./dist", "./"]
            }
        }
    }
})();

