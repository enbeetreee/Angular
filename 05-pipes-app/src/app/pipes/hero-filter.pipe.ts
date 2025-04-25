import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroFilter'
})

export class HeroFilterPipe implements PipeTransform {
  transform(value: Hero[], query:string): Hero[] {
    if (query=='') return value
    query = query.toLowerCase()
    return value.filter(h => h.name.toLowerCase().includes(query))
  }
}
