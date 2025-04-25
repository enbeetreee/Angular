
import { Component, computed, inject, input, output, signal } from "@angular/core";
import { CharacterListComponent } from "../../components/dragonball/character-list/character-list.component";
import type { Character } from "../../interfaces/character.interface";
import { CharacterAddComponent } from "../../components/dragonball/character-add/character-add.component";
import { DragonballService } from "../../services/dragonball.service";




@Component({
  templateUrl: './dragonball-super-page.component.html',
  selector: 'dragonball-super',
  imports: [CharacterListComponent, CharacterAddComponent]


})
export class DragonballSuperPageComponent {
  // constructor(//antiguo
  //   public dragonballService: DragonballService) {
  // }
  public dragonballService = inject(DragonballService);

}
