import { Component, inject, input, linkedSignal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'by-capital-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-capital-page.component.html',
})
export default class ByCapitalPageComponent {
  countryService = inject(CountryService)

  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';

  query = linkedSignal(() => this.queryParam);

  countryResource = rxResource({
    request: () => ({
      query: this.query()
    }),
    loader: ({ request }) => {
      console.log(this.query())
      if (!request.query) return of([]);//devuelve observable de array vacio

      this.router.navigate(['/country/by-capital'], {
        queryParams:{
          query: request.query
        }
      })

      return this.countryService.searchCountry(request.query, 'capital')
    }
  })  //  countryResource = resource({
  //   request: ()=>({
  //     query: this.query()
  //   }),
  //   loader: async({request})=>{
  //     if(!request.query)return []

  //       return await firstValueFrom(this.countryService.searchCountry(request.query, 'capital'))
  //   }
  // })

  // isLoading = signal(false)
  // isError = signal<string | null>(null)
  // countries = signal<Country[]>([])


  // searchCapital(query: string) {
  //   if (this.isLoading()) return;
  //   this.isLoading.set(true)
  //   this.isError.set(null)

  //   this.countryService.searchCountry(query, "capital").subscribe({
  //     next:(countries:Country[]) => {
  //         this.isLoading.set(false)
  //         this.countries.set(countries)
  //     },
  //     error:(err:Error)=>{
  //       console.log(err)
  //       this.isLoading.set(false)
  //       this.countries.set([])
  //       this.isError.set(err.message)
  //     }
  //   }
  //   )
  // }


}
