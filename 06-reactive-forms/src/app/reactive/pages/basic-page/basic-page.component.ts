import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder,  FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';
import { FormErrorComponent } from '../../../shared/components/form-error/form-error.component';



@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, FormErrorComponent, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent {
  // myForm = new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),

  // })

  private fb = inject(FormBuilder);

formUtils = FormUtils

  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]/*validadores sync*/, /*validadores async*/],
    price: [0, [Validators.required, Validators.min(10)]],
    inStorage: [0, [Validators.required, Validators.min(1)]],
  })


  onSave() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value)

    this.myForm.reset({
      name: '',
      price: 100,
      inStorage: 50
    })
  }
}
