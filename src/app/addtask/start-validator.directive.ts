import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from '@angular/forms';
import {endDateValidator} from './date-validator.directive';

export function startDateValidator(date: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let forbidden;
    forbidden = false;
    if (control.value !== null) {
      const eDate = date.split('-');
      const sDate = control.value.split('-');
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
  selector: '[appStartValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: StartValidatorDirective,
    multi: true
  }]
})
export class StartValidatorDirective implements Validator{
  @Input ('appStartValidator') dateName: string;
  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.dateName ? startDateValidator(this.dateName)(control) : null ;
  }

}
