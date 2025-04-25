import { Component, signal } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import type { Cliente } from '../../interfaces/cliente.interface'
import { AsyncPipe, I18nPluralPipe, I18nSelectPipe, JsonPipe, KeyValuePipe, SlicePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { interval, map, tap } from 'rxjs';


const cliente1: Cliente = {
  name: 'Fernando',
  gender: 'male',
  age: 39,
  adress: 'Ottawa, Canada'
}
const cliente2: Cliente = {
  name: 'Melissa',
  gender: 'female',
  age: 39,
  adress: 'Ottawa, Canada'
}

@Component({
  selector: 'app-uncommon-page',
  imports: [AsyncPipe, CardComponent, I18nSelectPipe, JsonPipe, UpperCasePipe, KeyValuePipe, I18nPluralPipe, SlicePipe, TitleCasePipe],
  templateUrl: './uncommon-page.component.html',
})
export default class UncommonPageComponent {

  client = signal<Cliente>(cliente1)

  invitationMap = {
    male: 'invitarlo',
    female: 'invitarla',
    other: 'invitarle'
  }

  changeClient() {
    if (this.client() == cliente1) {
      this.client.set(cliente2)
    } else {
      this.client.set(cliente1)
    }
  }

  //pLURAL
  clientesMap = signal({
    '=0': 'no tenemos ningún cliente esperando',
    '=1': 'tenemos 1 cliente esperando',
    other: 'tenemos # clientes esperando'
  })

  clients = signal([
    'Maria', 'Pedro', 'Natalia', 'Carlos', 'Manuel'
  ])

  deleteClient() {
    this.clients.update(prev => prev.slice(1))
  }

  profile: Cliente = {
    name: 'Fernando',
    gender: 'male',
    age: 36,
    adress: 'Ottawa'
  }

  //async
  promiseValue: Promise<string> = new Promise((res, rej) => {
    setTimeout(() => {
      res('Tenemos data en la promesa')
      console.log('Promesa cumplida')
    }, 3000)



  })
  myObservableTimer = interval(2000).pipe(
    map((value)=> value +1),
    tap((value) => console.log('tap: ',value))
  );


}
