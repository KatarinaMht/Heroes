import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


export const editValidator = (control: AbstractControl): {[key: string]: boolean} => {
            
    let companyProfile = control.get('companyProfile');
    let nationalWorkProfile = control.get('nationalWorkProfile');
    let moneyProposal = control.get('moneyProposal');
    let motivation = control.get('motivation');

    if (companyProfile.dirty || nationalWorkProfile.dirty || moneyProposal.dirty) {
        
        if (motivation.value == '') {
            //motivation.valid = false;
            return { motivationNotEmpty: true };
        }
    }
    return null;
};