import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';
import { FormErrorComponent } from '../../../shared/components/form-error/form-error.component';

@Component({
  selector: 'app-register-page',
  imports: [JsonPipe, ReactiveFormsModule, FormErrorComponent],
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
onSubmit() {
  if (this.myForm.invalid) {
    this.myForm.markAllAsTouched();
    return;
  }
  console.log('SUBMITED')

}
  formUtils = FormUtils

  fb = inject(FormBuilder)
  myForm : FormGroup= this.fb.group({
    name: ['', [Validators.required, Validators.pattern(this.formUtils.namePattern)]],
    email:['', [Validators.required, Validators.pattern(this.formUtils.emailPattern)], this.formUtils.checkingServerResponse],
    username:['', [Validators.required, Validators.minLength(6), this.formUtils.notStrider]],
    password:['', [Validators.required, Validators.minLength(6), Validators.pattern(this.formUtils.notOnlySpacesPattern)]],
    confirmPassword:['', [Validators.required]],

  },
{
  validators: [
    this.formUtils.areFieldsEqual('password','confirmPassword')
  ]
})



 }
