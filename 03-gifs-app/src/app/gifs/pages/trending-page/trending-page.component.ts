import {  AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifListComponent } from '../../components/gif-list/gif-list.component';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from '../../../shared/services/scroll-state.service';

@Component({
  selector: 'trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.component.html',

})
export default class TrendingPageComponent  implements AfterViewInit{

  scrollStateService = inject(ScrollStateService)

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('scrollDiv')

  gifService = inject(GifService)//singleton

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if(!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState()
  }


  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement
    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight

    const isAtBottom = scrollTop+clientHeight>=scrollHeight-300

    this.scrollStateService.trendingScrollState.set(scrollTop)

    if (isAtBottom){
      this.gifService.currentPage.update(page=>page+=1)
      this.gifService.loadTrendingGifs()
    }
  }

}

