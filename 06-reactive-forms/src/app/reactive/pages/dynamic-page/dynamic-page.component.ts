import { JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormUtils } from '../../../utils/form.utils';
import { FormErrorComponent } from '../../../shared/components/form-error/form-error.component';

@Component({
  selector: 'app-dynamic-page',
  imports: [JsonPipe, FormErrorComponent, ReactiveFormsModule],
  templateUrl: './dynamic-page.component.html',
})
export class DynamicPageComponent {

onSubmit() {
  if (this.myForm.invalid) {
    this.myForm.markAllAsTouched();
    return;
  }
  console.log('SUBMITED')

}
  onDeleteFavourite(index: number) {
    this.favoriteGames.markAsTouched()
    this.favoriteGames.removeAt(index)
  }
  onAddToFavourite() {
    if (this.newFavoriteGame.invalid) return
    const newGame = this.newFavoriteGame.value
    this.favoriteGames.push(this.fb.control(newGame, Validators.required))
    this.newFavoriteGame.reset()
  }

  private fb = inject(FormBuilder)
  formUtils = FormUtils


  myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Juego1', [Validators.required, Validators.minLength(3)]],
      ['Juego2', [Validators.required,, Validators.minLength(3)]]
    ],
    [Validators.minLength(2), Validators.required]
  ),
  })

  newFavoriteGame = this.fb.control('', Validators.required)

  get favoriteGames() {
    return this.myForm.get('favoriteGames') as FormArray;
  }

}
