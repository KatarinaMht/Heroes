"use strict";
var User = (function () {
    function User() {
    }
    User.prototype.isRole = function (role) {
        if (!this.roles)
            return false;
        var trovato = false;
        this.roles.forEach(function (r) {
            if (r === role) {
                trovato = true;
            }
        });
        return trovato;
    };
    return User;
}());
exports.User = User;
