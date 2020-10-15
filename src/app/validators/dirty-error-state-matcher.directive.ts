import {Directive} from '@angular/core';

import {FormControl, FormGroupDirective, NgForm} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Directive({
  selector: '[appDirtyErrorStateMatcher]'
})
export class DirtyErrorStateMatcherDirective implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(control && control.invalid && ((control.touched && control.dirty) || isSubmitted));
  }
}
