import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../../components/search-input/search-input.component';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
export type Region =
  | 'Africa'
  | 'Americas'
  | 'Asia'
  | 'Europe'
  | 'Oceania'
  | 'Antarctic';

function validateQueryParam(queryParam:string) :Region{
  const validRegions : Record<string, Region> = {
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  }
  return validRegions[queryParam]?? 'Americas'
}

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent, RouterLink, RouterLinkActive],
  templateUrl: './by-region-page.component.html',
})
export class ByRegionPageComponent {
  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryService = inject(CountryService)

  activatedRoute = inject(ActivatedRoute)
  router = inject(Router)

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? ''

  query = linkedSignal(() => validateQueryParam(this.queryParam.toLowerCase()))

  countryResource = rxResource({
    request: () => ({
      region: this.query()
    }),
    loader: ({ request }) => {
      if (request.region == null) return of([]);//devuelve observable de array vacio

      this.router.navigate(['/country/by-region/'], {
        queryParams: {
          region: request.region,
        }
      },
      )
      return this.countryService.searchCountry(request.region, 'region')
    }
  })
}
