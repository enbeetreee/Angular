//Macau no tiene capital y revienta las busquedas de asia
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { CountryResponse } from '../interfaces/country-response.interface';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mappers';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1'

@Injectable({ providedIn: 'root' })
export class CountryService {
  private http = inject(HttpClient)

  private queryCache = new Map()


  searchCountry(query: string, type: string): Observable<Country[]> {
    query = query.toLowerCase()

    if (this.queryCache.has(type+'-'+query)) {
      return of(this.queryCache.get(type+'-'+query)!)
    }
    console.log(`Buscando ${query} por ${type}`)
    return this.http.get<CountryResponse[]>(`${API_URL}/${type}/${query}`).pipe(
      map((items) => CountryMapper.mapReponseToCountries(items)),
      tap(countries => {this.queryCache.set(type+'-'+query, countries)} ),
      delay(1000),
      catchError((error) => {
        console.log("Error fetching", error);

        return throwError(
          () => new Error(`No se pudieron obtener países ${type == 'name' ? 'de nombre' : 'con '+type} ${query}`)
        );
      })
    )
  }
  searchCountryByCode(code: string) {
    if (this.queryCache.has('code-'+code)) {
      return of(this.queryCache.get('code-'+code)!)
    }

    return this.http.get<CountryResponse[]>(`${API_URL}/alpha/${code}`).pipe(
      map((items) => CountryMapper.mapReponseToCountries(items)),
      map(countries => countries[0]),
      tap(country => this.queryCache.set('code-'+code, country)),
      catchError((error) => {
        console.log("Error fetching", error);

        return throwError(
          () => new Error(`No se pudieron obtener países con el código ${code}`)
        );
      })
    )
  }

}
