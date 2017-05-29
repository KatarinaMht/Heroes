import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';


export const editValidator = (control: AbstractControl): { [key: string]: boolean } => {

    let companyProfile = control.get('companyProfile');
    let nationalWorkProfile = control.get('nationalWorkProfile');
    let moneyProposal = control.get('moneyProposal');
    let motivation = control.get('motivation');

    if ((companyProfile.value != 'Nulla' || nationalWorkProfile.value != 'Nulla' || moneyProposal.value != 'Nulla')) {
        console.log('Edit modal validator error: One field its not nulla!');
        if (motivation.value === '') {
            console.log('motivation is empty',motivation.value);
            motivation.setErrors({ motivationEmpty: true });
            console.log('motivation now invalid',motivation);
            return { motivationEmpty: true };
        }
    }

    if ((companyProfile.value == 'Nulla' || nationalWorkProfile.value == 'Nulla' || moneyProposal.value == 'Nulla')) {
        console.log('Edit modal validator error: All fields are nulla!');
        if (motivation.value != '') {
            console.log('motivation is not empty',motivation.value);
            motivation.setErrors({ motivationEmpty: true });
            console.log('motivation now invalid',motivation);
            return { motivationEmpty: true };
        }
    }
    
    return null;
};
