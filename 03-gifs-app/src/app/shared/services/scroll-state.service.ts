import { Injectable, signal } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ScrollStateService {
  trendingScrollState= signal(0);

  pagesScrollState : Record<string, number> = {}
//en caso de usar bien, hacer privada y meter setters y getters


}
