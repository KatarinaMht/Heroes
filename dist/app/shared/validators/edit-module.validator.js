"use strict";
exports.editValidator = function (control) {
    var companyProfile = control.get('companyProfile');
    var nationalWorkProfile = control.get('nationalWorkProfile');
    var moneyProposal = control.get('moneyProposal');
    var motivation = control.get('motivation');
    //if (companyProfile.dirty || nationalWorkProfile.dirty || moneyProposal.dirty) {
    if (motivation.value == '') {
        //motivation.valid = false;
        return { motivationNotEmpty: true };
    }
    // }
    return null;
};

//# sourceMappingURL=edit-module.validator.js.map
