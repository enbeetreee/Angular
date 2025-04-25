import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Route, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { routes } from '../../../app.routes';
import { filter, map, tap } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, /*AsyncPipe*/],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
router = inject(Router)

routes = routes.map(route=>({
  path: route.path,
  title: `${route.title ?? 'Maps en Angular'}`
})).filter(route => route.path!='**')

pageTitle = toSignal( this.router.events.pipe(// \*$ observable o suscribible, necesita suscripcion aka asyncpipe
  filter(event => event instanceof NavigationEnd),
  map(event => event.url),
  map(url => routes.find(route=> `/${route.path}` ==url)?.title ?? 'Mapas')
))

}
