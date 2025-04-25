import { Component, ElementRef, input, signal, viewChild } from '@angular/core';
import mapboxgl, { LngLat } from 'mapbox-gl';

/** width 100%
 *  height 260
 * */


@Component({
  selector: 'app-minimap',
  imports: [],
  templateUrl: './minimap.component.html',
  styles: `

    div{
      width: 100%;
      height: 300px;
    }`
})
export class MinimapComponent {
  divElement = viewChild<ElementRef>('map')
  map = signal<mapboxgl.Map | null>(null)
  coords = input.required<{
    lng: number;
    lat: number;
  }>()


  async ngAfterViewInit() {

    if (!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const element = this.divElement()!.nativeElement

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.coords(), // starting position [lng, lat]
      zoom: 14 // starting zoom
    });


    this.map.set(map)

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const marker = new mapboxgl.Marker({
      color: color
    }).setLngLat(this.coords())
      .addTo(this.map()!)
  }
 }
