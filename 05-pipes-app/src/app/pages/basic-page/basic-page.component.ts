import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { AvailableLocale, LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-basic-page',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
})
export default class BasicPageComponent {
  localeService = inject(LocaleService)

  nameLower = signal('aspen')
  nameUpper = signal('ASPEN')
  fullName = signal('aSpen CaRsI')

  customDate = signal(new Date())

  tickingDateEffect = effect((onCleanup)=>{

    const interval = setInterval(
      ()=> this.customDate.set(new Date),
      1000)
      console.log('tick')

      onCleanup(()=>{
        clearInterval(interval)
      })
  })

  changeLocale(locale:AvailableLocale){
    this.localeService.changeLocal(locale)
  }
 }
