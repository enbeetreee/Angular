import { Component, inject, input } from '@angular/core';
import { FormArray, FormGroup} from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';

@Component({
  selector: 'form-error',
  imports: [],
  templateUrl: './form-error.component.html',
})
export class FormErrorComponent {
  campo = input.required<string>()

  formUtils = FormUtils
  myForm = input.required<FormGroup>()
  isArray = input<boolean>(false)

}
