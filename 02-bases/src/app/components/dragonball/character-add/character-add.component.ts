import { ChangeDetectionStrategy, Component, Output, output, signal } from '@angular/core';
import { Character } from '../../../interfaces/character.interface';

@Component({
  selector: 'dragonball-character-add',
  imports: [],
  templateUrl: './character-add.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterAddComponent {
  name = signal('Son Gohan')
  power = signal(300)

  newCharacter = output<Character>()

  addCharacter() {
    const newCharacter: Character = {
      id: Math.floor(Math.random()*1000),
      name: this.name(),
      power: this.power(),
    };

    console.log(newCharacter)
    // this.characters.update(
    //   chars => [...chars, newCharacter]);

    this.newCharacter.emit(newCharacter)
    this.resetFields()



  }
  resetFields() {
    this.name.set('');
    this.power.set(0);
  }
}
