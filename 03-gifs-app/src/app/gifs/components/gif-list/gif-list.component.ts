import { Component, ElementRef, input, viewChild } from '@angular/core';
import { GifListItemComponent } from '../gif-list-item/gif-list-item.component';
import type { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifListItemComponent],
  templateUrl: './gif-list.component.html',

})
export class GifListComponent {
  gifs = input.required<Gif[]>();

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('scrollDiv')

  onScroll($event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    console.log(scrollTop)
  }

}
