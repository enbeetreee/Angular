import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path:'reactive',
    loadChildren:()=> import('./reactive/reactive.routes').then((mod)=>mod.reactiveRoutes)
  },{
    path:'auth',
    loadChildren:()=> import('./auth/auth.routes')
  },{
    path:'country',
    loadChildren:()=> import('./country/country.routes').then((mod)=>mod.countryRoutes)
  },{
    path:'**',
    redirectTo:'reactive'
  },
];
