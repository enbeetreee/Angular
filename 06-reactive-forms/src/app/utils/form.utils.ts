import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors } from '@angular/forms';

async function sleep() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 2500)
  })
}

export class FormUtils {


  static namePattern = '^([a-zA-Z]+) ([a-zA-Z]+)$';
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

  static isValidField(form: FormGroup, fieldName: string): boolean | null {

    return !!form.controls[fieldName].errors &&
      form.controls[fieldName].touched
  }
  static isValidFieldInArray(formArray: FormArray, index: number): boolean | null {
    return !!formArray.controls[index].errors
    //&& formArray.controls[index].touched
  }

  static getTextError(errors: ValidationErrors) {
    for (const key of Object.keys(errors)) {

      switch (key) {
        case 'required':
          return 'Este campo es requerido'
        case 'email':
          return 'Este email no es válido'
        case 'minlength':
          return `Mínimo de ${errors['minlength'].requiredLength} caracteres`
        case 'min':
          return `Valor mínimo de ${errors['min'].min}`
        case 'pattern':
          switch (errors['pattern'].requiredPattern) {
            case this.notOnlySpacesPattern:
              return 'La contraseña no puede estar formada por espacios'
            case this.emailPattern:
              return "El valor ingresado no parece un correo electrónico"
            case this.namePattern:
              return "El campo debe tener nombre y apellido"
          }
          break;

        case 'noStrider':
          return 'El username Strider no está permitido'
        case 'emailTaken':
          return 'Ya existe una cuenta con ese correo'
        case 'passwordsNotEqual':
          return 'Las contraseñas tienen que coincidir'
        default:
          `Error de validación no controlado ${key}`
      }

    }
    return null
  }

  static getFieldErrors(form: FormGroup, fieldName: string): string | null {
    if (!form.controls[fieldName]) return null

    const errors = form.controls[fieldName].errors ?? {}

    return this.getTextError(errors)
  }

  static getArrayFieldErrors(form: FormArray, index: number): string | null {
    if (form.controls.length == 0) return null

    const errors = form.controls[index].errors ?? {}

    return this.getTextError(errors)
  }

  static areFieldsEqual(field1: string, field2: string) {
    return (formGroup: AbstractControl) => {
      const field1Value = formGroup.get(field1)?.value
      const field2Value = formGroup.get(field2)?.value

      return field1Value == field2Value ? null :
        field1.includes('pass') ? {
          passwordsNotEqual: true
        } : {
          fieldsNotEqual: true
        };

    }

  }

  static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null> {
    console.log('Validando contra servidor')
    await sleep();
    const formValue = control.value;

    if (formValue == 'hola@mundo.com') {
      return { emailTaken: true }
    }

    return null;
  }
  static notStrider(control: AbstractControl): ValidationErrors | null {
    console.log('Validando contra servidor')

    const formValue = control.value;

    return formValue.toLowerCase() == 'strider' ? { noStrider: true } : null


  }
}
