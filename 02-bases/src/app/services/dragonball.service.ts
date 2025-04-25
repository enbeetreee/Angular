// aservice + tab = template
import { effect, Injectable, signal } from '@angular/core';
import { Character } from '../interfaces/character.interface';

const loadFromLocalStorage = () => {
  const characters = localStorage.getItem('charcters');
  return characters ? JSON.parse(characters) : [];
}

@Injectable({ providedIn: 'root' })//determina servicio
export class DragonballService {
  characters = signal<Character[]>(loadFromLocalStorage());

  saveToLocalStorage = effect(() => {
    localStorage.setItem('characters', JSON.stringify(this.characters()))

  })

  addCharacter(newCharacter: Character) {
    this.characters.update(list => [...list, newCharacter])
    this.saveToLocalStorage
  }
}
