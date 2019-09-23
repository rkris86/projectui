import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';

export function endDateValidator(date: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let forbidden;
    forbidden = false;
    if (control.value !== null) {
      const sDate = date.split('-');
      const eDate = control.value.split('-');
      const startDate = new Date(Number(sDate[0]), Number(sDate[1]), Number(sDate[2]));
      const endDate = new Date(Number(eDate[0]), Number(eDate[1]), Number(eDate[2]));
      if (endDate < startDate) {
        forbidden = true;
      }
    }
    return forbidden ? { 'dateName': {value: control.value}} : null;
  };
}
@Directive({
  selector: '[appDateValidator][ngModel]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: DateValidatorDirective,
    multi: true
  }]
})
export class DateValidatorDirective implements Validator {

  @Input ('appDateValidator') dateName: string;
  constructor() { }

   validate(control: AbstractControl): ValidationErrors | null {

      // return this.dateName ? dateNameValidator(new RegExp(this.dateName, 'i'))(control) : null ;
       return this.dateName ? endDateValidator(this.dateName)(control) : null ;
   }

}
