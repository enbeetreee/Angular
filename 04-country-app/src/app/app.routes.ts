import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { CountryLayoutPageComponent } from './country/layouts/country-layout-page/country-layout-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path:'country',
    loadChildren:()=> import('./country/country.routes')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
