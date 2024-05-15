import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

@Directive({
    selector: "[nonBlank]",
    providers: [{
        provide: NG_VALIDATORS,
        useExisting: NonBlankDirective,
        multi: true
    }],
    standalone: true,
})
export class NonBlankDirective implements Validator {
    validate(control: AbstractControl): ValidationErrors | null {
        return nonBlankValidator();
    }
}

export function nonBlankValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const isBlank = (control.value || '').trim().lenght() === 0;
        return isBlank ? { 'blank': 'value is blank' } : null;
    }
}