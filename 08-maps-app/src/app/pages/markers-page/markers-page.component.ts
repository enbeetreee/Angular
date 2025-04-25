
import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import mapboxgl, { LngLatLike, Map, MapMouseEvent} from 'mapbox-gl';
import {v4 as UUIDv4} from 'uuid'
import { JsonPipe } from '@angular/common';


interface Marker{
  id:string;
  mapboxMarker: mapboxgl.Marker
}

mapboxgl.accessToken = environment.MAPBOX_KEY
@Component({
  selector: 'app-markers-page',
  imports: [JsonPipe],
  templateUrl: './markers-page.component.html',
})
export class MarkersPageComponent implements AfterViewInit {
  divElement = viewChild<ElementRef>('map')
  map = signal<mapboxgl.Map | null>(null)
  markers = signal<Marker[]>([])


  async ngAfterViewInit() {
    if (!this.divElement()?.nativeElement) return;
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const element = this.divElement()!.nativeElement

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-122, 37], // starting position [lng, lat]
      zoom: 14 // starting zoom
    });

    this.mapListeners(map)

  }

  mapListeners(map: Map) {
    map.on('click', (event) => {
      this.mapClick(event)
    })
    this.map.set(map)
  }

  mapClick(event: MapMouseEvent) {
    if (!this.map()) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const marker = new mapboxgl.Marker({
      color: color
    }).setLngLat(event.lngLat)
      .addTo(this.map()!)

      const newMarker:Marker ={
        id: `${UUIDv4()}`,
        mapboxMarker: marker
      }

      this.markers.set([newMarker, ...this.markers()])
  }

  flyToMarker(lngLat: LngLatLike){
    if (!this.map()) return;

    this.map()!.flyTo({
      center:lngLat,
    })
  }

  deleteMarker(marker:Marker){
    if (!this.map()) return;

    const map = this.map()!;

    marker.mapboxMarker.remove()
    this.markers.set(this.markers().filter(m=> m.id != marker.id ))
  }
}
