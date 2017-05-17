"use strict";
exports.editValidator = function (control) {
    var companyProfile = control.get('companyProfile');
    var nationalWorkProfile = control.get('nationalWorkProfile');
    var moneyProposal = control.get('moneyProposal');
    var motivation = control.get('motivation');
    if ((companyProfile.value != 'Nulla' || nationalWorkProfile.value != 'Nulla' || moneyProposal.value != 'Nulla')) {
        console.log('one field its not nulla');
        if (motivation.value === '') {
            console.log('motivation is empty', motivation.value);
            //motivation.valid = false;
            motivation.setErrors({ motivationNotEmpty: true });
            console.log('motivation now invalid', motivation);
            return { motivationNotEmpty: true };
        }
    }
    return null;
};

//# sourceMappingURL=edit-module.validator.js.map
