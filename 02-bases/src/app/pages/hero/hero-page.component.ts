import { UpperCasePipe } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';

@Component({
  templateUrl: './hero-page.component.html',
  imports: [UpperCasePipe]
})
export class HeroPageComponent {
  name = signal('Iron Man')
  age = signal(45)

  capName = computed(()=>{
    return this.name().toUpperCase()
  })

  heroDescription = computed(() => {
    const description = this.name() + ', ' + this.age();
    return description
  }
  )

  changeHero() {
    this.name.set('Spiderman')
  }
  changeAge() {
    this.age.set(22)
  }
  resetForm() {
    this.name.set('Iron man')
    this.age.set(45)
  }
}
