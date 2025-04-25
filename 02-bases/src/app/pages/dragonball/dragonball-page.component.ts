import { NgClass } from "@angular/common";
import { Component, computed, signal } from "@angular/core";
import type { Character } from "../../interfaces/character.interface";


@Component({
  templateUrl: './dragonball-page.component.html',
  // imports:[NgClass],


})
export class DragonballPageComponent {

  name = signal('Gohan')
  power = signal(100)

  characters = signal<Character[]>([
    { id: 1, name: 'Goku', power: 9001 },

  ]);



  addCharacter() {
    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power(),
    };

    console.log(this.name(), ' ', this.power())
    this.characters.update(
      chars => [...chars, newCharacter]);

    this.resetFields()
  }

  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
