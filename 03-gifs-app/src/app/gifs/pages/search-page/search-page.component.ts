import {  Component, inject, signal } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';
import type { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.component.html',
})
export default class SearchPageComponent {
  searchGifs = signal<Gif[]>([])
  gifService = inject(GifService)
  onSearch(query: string) {
    this.gifService.loadQuery(query).subscribe((resp) => {
      this.searchGifs.set(resp);
      console.log({ resp })})
  }
}
