import { CanFlyPipe } from './../../pipes/can-fly.pipe';
import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../pipes/toggle-case.pipe';
import { heroes } from '../../data/heroes.data';
import { HeroColorPipe } from '../../pipes/hero-color.pipe';
import { CreatorPipe } from '../../pipes/creator.pipe';
import { HeroTextColorPipe } from '../../pipes/hero-text-color.pipe';
import { TitleCasePipe } from '@angular/common';
import { HeroSortByPipe } from '../../pipes/hero-sort-by.pipe';
import { Hero } from '../../interfaces/hero.interface';
import { HeroFilterPipe } from '../../pipes/hero-filter.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [ToggleCasePipe, HeroFilterPipe, HeroSortByPipe, TitleCasePipe, HeroTextColorPipe, CreatorPipe, HeroColorPipe, CanFlyPipe],
  templateUrl: './custom-page.component.html',
})
export default class CustomPageComponent {

toggle = signal<boolean>(true)

name = signal<string>('Aspen Carsí')

heroes = signal(heroes)

sortBy = signal<keyof Hero|null>(null)

seachQuery = signal('')
}
