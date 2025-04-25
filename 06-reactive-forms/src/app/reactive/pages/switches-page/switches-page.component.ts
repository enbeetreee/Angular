import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';
import { FormErrorComponent } from "../../../shared/components/form-error/form-error.component";

@Component({
  selector: 'app-switches-page',
  imports: [JsonPipe, ReactiveFormsModule ],
  templateUrl: './switches-page.component.html',
})
export class SwitchesPageComponent {
  onSumbit() {
    if (!this.myForm.valid) {
      this.myForm.markAllAsTouched()
      return
    }
  }
  private fb = inject(FormBuilder);
  formUtils = FormUtils
  myForm: FormGroup = this.fb.group({
    gender: ['M', Validators.required],
    wantNotifications: [true],
    termsAndConditions: [false, Validators.requiredTrue]
  })

}
