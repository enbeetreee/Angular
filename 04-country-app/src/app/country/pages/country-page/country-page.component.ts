import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountryResponse } from '../../interfaces/country-response.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { NotFoundComponent } from "../../../shared/components/not-found/not-found.component";
import { CountryInfoComponent } from "./country-info/country-info.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInfoComponent],
  templateUrl: './country-page.component.html',
})
export class CountryPageComponent {
  countryService = inject(CountryService)
  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  countryResource = rxResource({
    request: () =>({code: this.countryCode}),
    loader: ({request})=>{
return this.countryService.searchCountryByCode(request.code)
    }
  })

 }
