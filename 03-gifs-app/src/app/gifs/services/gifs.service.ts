import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interfaces/giphy.interface';
import { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

function loadFromLocalStorage() {
  const gifs = localStorage.getItem('searchHistory')
  return gifs ? JSON.parse(gifs) : {}
}

@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  trendinGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(false)
  currentPage = signal(0);

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];

    for (let i = 0; i < this.trendinGifs().length; i += 3) {
      groups.push(this.trendinGifs().slice(i, i + 3))
    }

    return groups;
  })

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed<string[]>(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs()
    console.log('Servicio creado')

  }

  loadTrendingGifs() {
    if (this.trendingGifsLoading()) return;

    this.trendingGifsLoading.set(true)

    this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyKey,
        offset: this.currentPage() * 20,
        limit: 20,
      }
    }).subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemstoGifArray(resp.data)
      this.trendinGifs.update(currentGifs => [...currentGifs, ...gifs])
      this.trendingGifsLoading.set(false)
    })
  }


  loadQuery(query: string) {
    return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
      params: {
        api_key: environment.giphyKey,
        limit: 20,

        q: query,
      }
    }).pipe(
      map(({ data }) => data),
      map((items) => GifMapper.mapGiphyItemstoGifArray(items)),
      tap(items => {
        this.searchHistory.update(history => ({ ...history, [query.toLowerCase()]: items, }))
      })

    )


  }

  getHistoryGifs(query: string) {
    return this.searchHistory()[query] ?? [];
  }


  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory())
    localStorage.setItem('searchHistory', historyString)
  })
}

