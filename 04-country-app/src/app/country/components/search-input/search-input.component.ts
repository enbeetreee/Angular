import { Component, effect, inject, input, linkedSignal, output, signal } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Name } from '../../interfaces/country-response.interface';

@Component({
  selector: 'country-search-input',
  imports: [],
  templateUrl: './search-input.component.html',
})
export class SearchInputComponent {
  searchParameter= input<string>()
  initialValue = input<string>()

  searchValue = output<string>()

  inputValue = linkedSignal<string>(()=>this.initialValue()?? '')

  onSearch(value:string){
    this.searchValue.emit(value)
  }

  debounceEffect = effect((onCleanup)=>{
    const value = this.inputValue();//effecto se dispara cada vez que cambia la señal
    const timeout = setTimeout(()=>{
      this.searchValue.emit(value)
    }, 500)
    onCleanup(()=>{
      clearTimeout(timeout)
    })
  })

}
