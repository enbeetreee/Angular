import { Routes } from '@angular/router';

export const routes: Routes = [
{path:'basic',
  title:'Pipes Básicos',
  loadComponent: ()=> import('./pages/basic-page/basic-page.component')
},{path:'numbers',
  title:'Pipes Numéricos',
loadComponent: ()=> import('./pages/numbers-page/numbers-page.component')
},{path:'uncommon',
  title:'Pipes Poco Comunes',
  loadComponent: ()=> import('./pages/uncommon-page/uncommon-page.component')
},
{path:'custom',
  title:'Pipes Custom',
  loadComponent: ()=> import('./pages/custom-page/custom-page.component')
},
{
  path:'**',
  redirectTo:'basic'
}
];
